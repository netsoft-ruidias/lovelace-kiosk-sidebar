// ------------------------------------------------------------------------------------------
//  KIOSK-SIDEBAR
// ------------------------------------------------------------------------------------------

const KIOSK_SIDEBAR_TITLE = 'KIOSK-SIDEBAR';
const KIOSK_SIDEBAR_VERSION = '1.0.0.0';

import { css, html, LitElement } from 'lit-element';
import { moreInfo } from 'card-tools/src/more-info';
import { hass, provideHass } from 'card-tools/src/hass';
//import { subscribeRenderTemplate } from 'card-tools/src/templates';
import { forwardHaptic, getLovelace, navigate, toggleEntity } from 'custom-card-helpers';

class KioskSidebar extends LitElement {
    /* **************************************** *
     *        Element's local properties        *
     * **************************************** */

    config: any;
    hass: any;
    shadowRoot: any;
    cards: any = {};
    CUSTOM_TYPE_PREFIX = 'custom:';

    /* **************************************** *
     *        Element's public properties       *
     * **************************************** */

    static get properties() {
        return {
            hass: {},
            config: {},
            active: {},
        };
    }

    /* **************************************** *
     *           Element constructor            *
     * **************************************** */

    constructor() {
        super();
    }

    /* **************************************** *
     *   Element's HTML renderer (lit-element)  *
     * **************************************** */

    render() {
        // const sidebarMenu = this.config.sidebarMenu;
        const addStyle = 'style' in this.config;

        // this.twelveHourVersion = this.config.twelveHourVersion ? this.config.twelveHourVersion : false;
        // this.period = this.config.period ? this.config.period : false;
        // this.dateFormat = this.config.dateFormat ? this.config.dateFormat : 'DD MMMM';
        // this.bottomCard = this.config.bottomCard ? this.config.bottomCard : null;

        this.cards = this.config.cards && this.config.cards.length > 0 ? this.config.cards : null;

        return html`
            ${addStyle
                ? html`<style>${this.config.style}</style>`
                : html``
            }
            
            <div class="sidebar-inner">
            
            </div>`;
    }

    updateSidebarSize(root) {
        const sidebarInner = this.shadowRoot.querySelector('.sidebar-inner');
        const header = root.shadowRoot.querySelector('ch-header') || root.shadowRoot.querySelector('app-header');
        const offParam = getParameterByName('sidebarOff');

        if (sidebarInner) {
            sidebarInner.style.width = this.offsetWidth + 'px';
            let headerHeight = this.config.hideTopMenu && offParam == null ? 0 : header.offsetHeight;
            log2console('updateSidebarSize', 'headerHeight', headerHeight);
            sidebarInner.style.height = `calc(${window.innerHeight}px - ${headerHeight}px)`; //100 * _1vh - headerHeight + 'px';
            sidebarInner.style.top = headerHeight + 'px';
        }
    }

    _buildHtmlMenu(menu) {
        return html`
            <ul class="sidebarMenu">
                ${menu.map(menuItem => {
                    console.log("_buildHtmlMenu", menuItem);
                    // return html`
                    //     <li @click="${x => this._menuAction(x)}" class="${menuItem.state && this.hass.states[menuItem.state].state != 'off' && this.hass.states[menuItem.state].state != 'unavailable' ? 'active' : ''}" data-type="${menuItem.action}" data-path="${menuItem.navigation_path ? menuItem.navigation_path : ''}" data-menuitem="${JSON.stringify(menuItem)}">
                    //         <span>${menuItem.name}</span>
                    //         ${menuItem.icon
                    //             ? html`<ha-icon @click="${(e) => this._menuAction(e)}" icon="${menuItem.icon}"></ha-icon>`
                    //             : html``}
                    //     </li>`;
                    return html`<li>${menuItem.name}</li>`;
                })}
            </ul>
        `;
    }

    _renderMenu(sidebarMenu) {
        if (sidebarMenu && sidebarMenu.menu && sidebarMenu.menu.length > 0) {
            console.log("htmlMenu", "sidebarMenu", sidebarMenu);
            console.log("htmlMenu", "sidebarMenu.menu", sidebarMenu.menu);

            const htmlMenu = this._buildHtmlMenu(sidebarMenu.menu);

            //const menuElement = document.createElement(`ul`);
            //menuElement.classList.add( "sidebarMenu" );

            console.log("htmlMenu TemplateResult:", htmlMenu);
            console.log("htmlMenu new:", htmlMenu.getHTML());

            //menuElement.insertAdjacentHTML("beforeend", htmlMenu.getHTML());
            //menuElement.innerHTML = htmlMenu.getHTML();

            var sidebarInner = this.shadowRoot.querySelector('.sidebar-inner');
            //sidebarInner.appendChild(menuElement);
            sidebarInner.insertAdjacentHTML("beforeend", htmlMenu.getHTML());
        }
    }

    _renderCard(card) {
        log2console('firstUpdated', 'Card: ', card);
        if (!card || typeof card !== 'object' || !card.type) {
            error2console('firstUpdated', 'Card config error!');
        } else {
            let tag = card.type;
            if (tag.startsWith(this.CUSTOM_TYPE_PREFIX)) tag = tag.substr(this.CUSTOM_TYPE_PREFIX.length);
            else tag = `hui-${tag}-card`;

            const cardElement = document.createElement(tag);
            cardElement.setConfig(card);
            cardElement.hass = hass();

            var sidebarInner = this.shadowRoot.querySelector('.sidebar-inner');
            sidebarInner.appendChild(cardElement);
            provideHass(cardElement);

            // if (entry.cardStyle && entry.cardStyle != '') {
            //     let style = entry.cardStyle;
            //     let itterations = 0;
            //     let interval = setInterval(() => {
            //         if (cardElement && cardElement.shadowRoot) {
            //             window.clearInterval(interval);
            //             var styleElement = document.createElement('style');
            //             styleElement.innerHTML = style;
            //             cardElement.shadowRoot.appendChild(styleElement);
            //         } else if (++itterations === 10) {
            //             window.clearInterval(interval);
            //         }
            //     }, 100);
            // }
        }
    }

    firstUpdated() {
        provideHass(this);
        let root = getRoot();
        root.shadowRoot.querySelectorAll('paper-tab').forEach((paperTab) => {
            log2console('firstUpdated', 'Menu item found');
            paperTab.addEventListener('click', () => {
                this._updateActiveMenu();
            });
        });
        const self = this;

        setTimeout(() => {
            self.updateSidebarSize(root);
            self._updateActiveMenu();
        }, 1);

        window.addEventListener(
            'resize',
            () => {
                self.updateSidebarSize(root);
            },
            true
        );

        if (this.cards && this.cards.length > 0) {
            this.cards.map(entry => {
                if (entry.type == "sidebarMenu") {
                    this._renderMenu(entry)
                } else {
                    //setTimeout(() => this._renderCard(entry), 2);
                    this._renderCard(entry)
                }
            });
        }
    }

    _updateActiveMenu() {
        this.shadowRoot.querySelectorAll('ul.sidebarMenu li[data-type="navigate"]').forEach((menuItem) => {
            menuItem.classList.remove('active');
        });
        let activeEl = this.shadowRoot.querySelector('ul.sidebarMenu li[data-path="' + document.location.pathname + '"]');
        if (activeEl) {
            activeEl.classList.add('active');
        }
    }

    _menuAction(e) {
        if ((e.target.dataset && e.target.dataset.menuitem) || (e.target.parentNode.dataset && e.target.parentNode.dataset.menuitem)) {
            const menuItem = JSON.parse(e.target.dataset.menuitem || e.target.parentNode.dataset.menuitem);
            this._customAction(menuItem);
            this._updateActiveMenu();
        }
    }

    _customAction(tapAction) {
        switch (tapAction.action) {
            case 'more-info':
                if (tapAction.entity || tapAction.camera_image) {
                    moreInfo(tapAction.entity ? tapAction.entity : tapAction.camera_image!);
                }
                break;
            case 'navigate':
                if (tapAction.navigation_path) {
                    navigate(window, tapAction.navigation_path);
                }
                break;
            case 'url':
                if (tapAction.url_path) {
                    window.open(tapAction.url_path);
                }
                break;
            case 'toggle':
                if (tapAction.entity) {
                    toggleEntity(this.hass, tapAction.entity!);
                    forwardHaptic('success');
                }
                break;
            case 'call-service': {
                if (!tapAction.service) {
                    forwardHaptic('failure');
                    return;
                }
                const [domain, service] = tapAction.service.split('.', 2);
                this.hass.callService(domain, service, tapAction.service_data);
                forwardHaptic('success');
            }
        }
    }

    setConfig(config) {
        this.config = config;

        // if (this.config.template) {
        //     subscribeRenderTemplate(
        //         null,
        //         (res) => {
        //             this.templateLines = res.match(/<li>([^]*?)<\/li>/g).map(function (val) {
        //                 return val.replace(/<\/?li>/g, '');
        //             });
        //             this.requestUpdate();
        //         },
        //         {
        //             template: this.config.template,
        //             variables: { config: this.config },
        //             entity_ids: this.config.entity_ids,
        //         }
        //     );
        // }
    }

    getCardSize() {
        return 1;
    }

    static get styles() {
        return css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // --face-color: #FFF;
        // --face-border-color: #FFF;
        // --clock-hands-color: #000;
        // --clock-seconds-hand-color: #FF4B3E;
        // --clock-middle-background: #FFF;
        // --clock-middle-border: #000;
        // --sidebar-background: #FFF;
        // --sidebar-text-color: #000;
        // --sidebar-icon-color: #000;
        // --sidebar-selected-text-color: #000;
        // --sidebar-selected-icon-color: #000;
        background-color:  var(--sidebar-background, var(--paper-listbox-background-color, var(--primary-background-color, #fff)));
      }
      .sidebar-inner {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        position: fixed;
        width: 0;
      }
      .sidebarMenu {
        list-style: none;
        margin: 20px 0;
        padding: 20px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      .sidebarMenu li {
        color: var(--sidebar-text-color, #000);
        position: relative;
        padding: 10px 20px;
        border-radius: 12px;
        font-size: 18px;
        line-height: 24px;
        font-weight: 300;
        white-space: normal;
        display: block;
        cursor: pointer;
      }
      .sidebarMenu li ha-icon {
        float: right;
        color: var(--sidebar-icon-color, #000);
      }
      .sidebarMenu li.active {
        color: var(--sidebar-selected-text-color);
      }
      .sidebarMenu li.active ha-icon {
        color: var(--sidebar-selected-icon-color, rgb(247, 217, 89));
      }
      .sidebarMenu li.active::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--sidebar-selected-icon-color, #000);
        opacity: 0.12;
        border-radius: 12px;
      }
      h1 {
        margin-top: 0;
        margin-bottom: 20px;
        font-size: 32px;
        line-height: 32px;
        font-weight: 200;
        color: var(--sidebar-text-color, #000);
        cursor: default;
      }
      h1.digitalClock {
        font-size: 60px;
        line-height: 60px;
        cursor: default;
      }
      h1.digitalClock.with-seconds {
        font-size: 48px;
        line-height: 48px;
        cursor: default;
      }
      h1.digitalClock.with-title {
        margin-bottom: 0;
        cursor: default;
      }
      h2 {
        margin: 0;
        font-size: 26px;
        line-height: 26px;
        font-weight: 200;
        color: var(--sidebar-text-color, #000);
        cursor: default;
      }
      .template {
        margin: 0;
        padding: 0;
        list-style: none;
        color: var(--sidebar-text-color, #000);
      }

      .template li {
        display: block;
        color: inherit;
        font-size: 18px;
        line-height: 24px;
        font-weight: 300;
        white-space: normal;
      }
    `;
    }
}

customElements.define('kiosk-sidebar', KioskSidebar);

// ##########################################################################################
// ###   The default CSS of the Kiosk Sidebar element
// ##########################################################################################

function createCSS(sidebarConfig: any, width: number) {
    let sidebarWidth = 25;
    let contentWidth = 75;
    let sidebarResponsive = false;
    if (sidebarConfig.width) {
        if (typeof sidebarConfig.width == 'number') {
            sidebarWidth = sidebarConfig.width;
            contentWidth = 100 - sidebarWidth;
        } else if (typeof sidebarConfig.width == 'object') {
            sidebarWidth = sidebarConfig.desktop;
            contentWidth = 100 - sidebarWidth;
            sidebarResponsive = true;
        }
    }
    // create css
    let css = `
    #customSidebarWrapper { 
      display:flex;
      flex-direction:row;
      overflow:hidden;
    }
    #customSidebar.hide {
      display:none!important;
      width:0!important;
    }
    #contentContainer.hideSidebar {
      width:100%!important;
    }
    `;
    if (sidebarResponsive) {
        if (width <= sidebarConfig.breakpoints.mobile) {
            if (sidebarConfig.width.mobile == 0) {
                css +=
                    `
          #customSidebar {
            width:` +
                    sidebarConfig.width.mobile +
                    `%;
            overflow:hidden;
            display:none;
          } 
          #contentContainer {
            width:` +
                    (100 - sidebarConfig.width.mobile) +
                    `%;
          }
        `;
            } else {
                css +=
                    `
          #customSidebar {
            width:` +
                    sidebarConfig.width.mobile +
                    `%;
            overflow:hidden;
          } 
          #contentContainer {
            width:` +
                    (100 - sidebarConfig.width.mobile) +
                    `%;
          }
        `;
            }
        } else if (width <= sidebarConfig.breakpoints.tablet) {
            if (sidebarConfig.width.tablet == 0) {
                css +=
                    `
          #customSidebar {
            width:` +
                    sidebarConfig.width.tablet +
                    `%;
            overflow:hidden;
            display:none;
          } 
          #contentContainer {
            width:` +
                    (100 - sidebarConfig.width.tablet) +
                    `%;
          }
        `;
            } else {
                css +=
                    `
          #customSidebar {
            width:` +
                    sidebarConfig.width.tablet +
                    `%;
            overflow:hidden;
          } 
          #contentContainer {
            width:` +
                    (100 - sidebarConfig.width.tablet) +
                    `%;
          }
        `;
            }
        } else {
            if (sidebarConfig.width.tablet == 0) {
                css +=
                    `
          #customSidebar {
            width:` +
                    sidebarConfig.width.desktop +
                    `%;
            overflow:hidden;
            display:none;
          } 
          #contentContainer {
            width:` +
                    (100 - sidebarConfig.width.desktop) +
                    `%;
          }
        `;
            } else {
                css +=
                    `
          #customSidebar {
            width:` +
                    sidebarConfig.width.desktop +
                    `%;
            overflow:hidden;
          } 
          #contentContainer {
            width:` +
                    (100 - sidebarConfig.width.desktop) +
                    `%;
          }
        `;
            }
        }
    } else {
        css +=
            `
      #customSidebar {
        width:` +
            sidebarWidth +
            `%;
        overflow:hidden;
      } 
      #contentContainer {
        width:` +
            contentWidth +
            `%;
      }
    `;
    }
    return css;
}

// ##########################################################################################
// ###   Helper methods
// ##########################################################################################

async function log2console(method: string, message: string, object?: any) {
    const lovelace = await getConfig();
    if (lovelace.config.sidebar) {
        const sidebarConfig = Object.assign({}, lovelace.config.sidebar);
        if (sidebarConfig.debug === true) {
            console.info(`%c${KIOSK_SIDEBAR_TITLE}: %c ${method.padEnd(24)} -> %c ${message}`, 'color: chartreuse; background: black; font-weight: 700;', 'color: yellow; background: black; font-weight: 700;', '', object);
        }
    }
}

async function error2console(method: string, message: string, object?: any) {
    const lovelace = await getConfig();
    if (lovelace.config.sidebar) {
        const sidebarConfig = Object.assign({}, lovelace.config.sidebar);
        if (sidebarConfig.debug === true) {
            console.error(`%c${KIOSK_SIDEBAR_TITLE}: %c ${method.padEnd(24)} -> %c ${message}`, 'color: red; background: black; font-weight: 700;', 'color: white; background: black; font-weight: 700;', 'color:red', object);
        }
    }
}

// Returns the root element
function getRoot() {
    let root: any = document.querySelector('home-assistant');
    root = root && root.shadowRoot;
    root = root && root.querySelector('home-assistant-main');
    root = root && root.shadowRoot;
    root = root && root.querySelector('app-drawer-layout partial-panel-resolver');
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector('ha-panel-lovelace');
    root = root && root.shadowRoot;
    root = root && root.querySelector('hui-root');

    return root;
}

// Returns the Home Assistant Sidebar element
function getSidebar() {
    let sidebar: any = document.querySelector('home-assistant');
    sidebar = sidebar && sidebar.shadowRoot;
    sidebar = sidebar && sidebar.querySelector('home-assistant-main');
    sidebar = sidebar && sidebar.shadowRoot;
    sidebar = sidebar && sidebar.querySelector('app-drawer-layout app-drawer ha-sidebar');

    return sidebar;
}

// Returns the Home Assistant app-drawer layout element
function getAppDrawerLayout() {
    let appDrawerLayout: any = document.querySelector('home-assistant');
    appDrawerLayout = appDrawerLayout && appDrawerLayout.shadowRoot;
    appDrawerLayout = appDrawerLayout && appDrawerLayout.querySelector('home-assistant-main');
    appDrawerLayout = appDrawerLayout && appDrawerLayout.shadowRoot;
    appDrawerLayout = appDrawerLayout && appDrawerLayout.querySelector('app-drawer-layout');
    appDrawerLayout = appDrawerLayout && appDrawerLayout.shadowRoot;
    appDrawerLayout = appDrawerLayout && appDrawerLayout.querySelector('#contentContainer');

    return appDrawerLayout;
}

// Returns the Home Assistant app-drawer element
function getAppDrawer() {
    let appDrawer: any = document.querySelector('home-assistant');
    appDrawer = appDrawer && appDrawer.shadowRoot;
    appDrawer = appDrawer && appDrawer.querySelector('home-assistant-main');
    appDrawer = appDrawer && appDrawer.shadowRoot;
    appDrawer = appDrawer && appDrawer.querySelector('app-drawer-layout app-drawer');
    appDrawer = appDrawer && appDrawer.shadowRoot;
    appDrawer = appDrawer && appDrawer.querySelector('#contentContainer');

    return appDrawer;
}

// Returns a query parameter by its name
function getParameterByName(name: string, url = window.location.href) {
    const parameterName = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + parameterName + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// hides (if requested) the HA header, HA footer and/or HA sidebar and hides this sidebar if configured so
function updateStyling(appLayout: any, sidebarConfig: any) {
    const width = document.body.clientWidth;
    appLayout.shadowRoot.querySelector('#customSidebarStyle').textContent = createCSS(sidebarConfig, width);

    const root = getRoot();
    const hassHeader = root.shadowRoot.querySelector('ch-header') || root.shadowRoot.querySelector('app-header');
    log2console('updateStyling', hassHeader ? 'Home Assistant header found!' : 'Home Assistant header not found!');
    const hassFooter = root.shadowRoot.querySelector('ch-footer' || root.shadowRoot.querySelector('app-footer'));
    log2console('updateStyling', hassFooter ? 'Home Assistant footer found!' : 'Home Assistant footer not found!');
    const offParam = getParameterByName('sidebarOff');
    const view = root.shadowRoot.getElementById('view');

    if (sidebarConfig.hideTopMenu && sidebarConfig.hideTopMenu === true && sidebarConfig.showTopMenuOnMobile && sidebarConfig.showTopMenuOnMobile === true && width <= sidebarConfig.breakpoints.mobile && offParam == null) {
        if (hassHeader) {
            log2console('updateStyling', 'Action: Show Home Assistant header!');
            hassHeader.style.display = 'block';
        }
        if (view) {
            view.style.minHeight = 'calc(100vh - var(--header-height))';
        }
        if (hassFooter) {
            log2console('updateStyling', 'Action: Show Home Assistant footer!');
            hassFooter.style.display = 'flex';
        }
    } else if (sidebarConfig.hideTopMenu && sidebarConfig.hideTopMenu === true && offParam == null) {
        if (hassHeader) {
            log2console('updateStyling', 'Action: Hide Home Assistant header!');
            hassHeader.style.display = 'none';
        }
        if (hassFooter) {
            log2console('updateStyling', 'Action: Hide Home Assistant footer!');
            hassFooter.style.display = 'none';
        }
        if (view) {
            view.style.minHeight = 'calc(100vh)';
        }
    }
}

// watch and handle the resize and location-changed events
function subscribeEvents(appLayout: any, sidebarConfig: any, contentContainer: any, sidebar: any) {
    window.addEventListener(
        'resize',
        function () {
            updateStyling(appLayout, sidebarConfig);
        },
        true
    );

    if ('hideOnPath' in sidebarConfig) {
        window.addEventListener('location-changed', () => {
            if (sidebarConfig.hideOnPath.includes(window.location.pathname)) {
                contentContainer.classList.add('hideSidebar');
                sidebar.classList.add('hide');
            } else {
                contentContainer.classList.remove('hideSidebar');
                sidebar.classList.remove('hide');
            }
        });

        if (sidebarConfig.hideOnPath.includes(window.location.pathname)) {
            log2console('subscribeEvents', 'Disable sidebar for this path');
            contentContainer.classList.add('hideSidebar');
            sidebar.classList.add('hide');
        }
    }
}

function watchLocationChange() {
    setTimeout(() => {
        window.addEventListener('location-changed', () => {
            const root = getRoot();
            if (!root) return; // location changed before finishing dom rendering
            const appLayout = root.shadowRoot.querySelector('ha-app-layout');
            const wrapper = appLayout.shadowRoot.querySelector('#wrapper');
            if (!wrapper) {
                buildSidebar();
            } else {
                const customSidebarWrapper = wrapper.querySelector('#customSidebarWrapper');
                if (!customSidebarWrapper) {
                    buildSidebar();
                } else {
                    const customSidebar = customSidebarWrapper.querySelector('#customSidebar');
                    if (!customSidebar) {
                        buildSidebar();
                    }
                }
            }
        });
    }, 1000);
}

// build the custom sidebar card
async function buildCard(sidebar: any, config: any) {
    const kioskSidebar = document.createElement('kiosk-sidebar') as KioskSidebar;
    kioskSidebar.setConfig(config);
    kioskSidebar.hass = hass();

    sidebar.appendChild(kioskSidebar);
}

// non-blocking sleep function
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// gets the lovelace config
async function getConfig() {
    let lovelace: any;
    while (!lovelace) {
        lovelace = getLovelace();
        if (!lovelace) {
            await sleep(500);
        }
    }

    return lovelace;
}

// ##########################################################################################
// ###   The Kiosk Sidebar code base initialisation
// ##########################################################################################

async function buildSidebar() {
    const lovelace = await getConfig();
    if (lovelace.config.sidebar) {
        const sidebarConfig = Object.assign({}, lovelace.config.sidebar);
        if (!sidebarConfig.width || (sidebarConfig.width && typeof sidebarConfig.width == 'number' && sidebarConfig.width > 0 && sidebarConfig.width < 100) || (sidebarConfig.width && typeof sidebarConfig.width == 'object')) {
            const root = getRoot();
            const hassSidebar = getSidebar();
            const appDrawerLayout = getAppDrawerLayout();
            const appDrawer = getAppDrawer();
            const offParam = getParameterByName('sidebarOff');

            if (sidebarConfig.hideTopMenu && sidebarConfig.hideTopMenu === true && offParam == null) {
                if (root.shadowRoot.querySelector('ch-header')) root.shadowRoot.querySelector('ch-header').style.display = 'none';
                if (root.shadowRoot.querySelector('app-header')) root.shadowRoot.querySelector('app-header').style.display = 'none';
                if (root.shadowRoot.querySelector('ch-footer')) root.shadowRoot.querySelector('ch-footer').style.display = 'none';
                if (root.shadowRoot.getElementById('view')) root.shadowRoot.getElementById('view').style.minHeight = 'calc(100vh)';
            }
            if (sidebarConfig.hideHassSidebar && sidebarConfig.hideHassSidebar === true && offParam == null) {
                if (hassSidebar) {
                    hassSidebar.style.display = 'none';
                }
                if (appDrawerLayout) {
                    appDrawerLayout.style.marginLeft = '0';
                }
                if (appDrawer) {
                    appDrawer.style.display = 'none';
                }
            }
            if (!sidebarConfig.breakpoints) {
                sidebarConfig.breakpoints = {
                    tablet: 1024,
                    mobile: 768,
                };
            } else if (sidebarConfig.breakpoints) {
                if (!sidebarConfig.breakpoints.mobile) {
                    sidebarConfig.breakpoints.mobile = 768;
                }
                if (!sidebarConfig.breakpoints.tablet) {
                    sidebarConfig.breakpoints.tablet = 1024;
                }
            }

            let appLayout = root.shadowRoot.querySelector('ha-app-layout');
            let css = createCSS(sidebarConfig, document.body.clientWidth);
            let style: any = document.createElement('style');
            style.setAttribute('id', 'customSidebarStyle');
            appLayout.shadowRoot.appendChild(style);
            style.type = 'text/css';
            if (style.styleSheet) {
                // This is required for IE8 and below.
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            // get element to wrap
            let contentContainer = appLayout.shadowRoot.querySelector('#contentContainer');
            // create wrapper container
            const wrapper = document.createElement('div');
            wrapper.setAttribute('id', 'customSidebarWrapper');
            // insert wrapper before el in the DOM tree
            contentContainer.parentNode.insertBefore(wrapper, contentContainer);
            // move el into wrapper
            let sidebar = document.createElement('div');
            sidebar.setAttribute('id', 'customSidebar');
            wrapper.appendChild(sidebar);
            wrapper.appendChild(contentContainer);
            await buildCard(sidebar, sidebarConfig);
            //updateStyling(appLayout, sidebarConfig);
            subscribeEvents(appLayout, sidebarConfig, contentContainer, sidebar);
            setTimeout(function () {
                updateStyling(appLayout, sidebarConfig);
            }, 1);
        } else {
            error2console('buildSidebar', 'Error sidebar in width config!');
        }
    } else {
        log2console('buildSidebar', 'No sidebar in config found!');
    }
}

// show console message on init
console.info(
    `%c  ${KIOSK_SIDEBAR_TITLE.padEnd(24)}%c Version: ${KIOSK_SIDEBAR_VERSION.padEnd(9)}`,
    'color: chartreuse; background: black; font-weight: 700;',
    'color: white; background: dimgrey; font-weight: 700;'
);

buildSidebar();
watchLocationChange();