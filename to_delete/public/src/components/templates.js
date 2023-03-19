(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['account-navigation.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section class=\"account-navigation\">\r\n    <nav class=\"account-navigation__nav\">\r\n\r\n        <hr class=\"account-navigation__hr\" id=\"account-navigation__hr\">\r\n    </nav>\r\n</section>";
},"useData":true});
templates['account-profile.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"account-profile\" id=\"account-profile\">\r\n    <div class=\"account-profile__area\">\r\n        <div class=\"account-profile__avatar-area\">\r\n            <div class=\"account-sidebar__item account-sidebar__avatar__active-user\">\r\n                <a class=\"account-sidebar__avatar account-sidebar__avatar__hover-active\" href=\"/profile\" aria-label=\"Сменить аватар\">\r\n                    <img class=\"account-sidebar__avatar-img\" src="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"avatar") : depth0), depth0))
    + " alt=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"login") : depth0), depth0))
    + "\">\r\n                </a>\r\n                <div class=\"account-sidebar__text\">\r\n                    <div class=\"account-sidebar__title\" >\r\n                        <div class=\"account-sidebar__name\" aria-label=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"firstName") : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"lastName") : depth0), depth0))
    + "\">\r\n                            "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"firstName") : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"lastName") : depth0), depth0))
    + "\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"account-sidebar__desc\" aria-label=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"login") : depth0), depth0))
    + "\">\r\n                        "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"login") : depth0), depth0))
    + "\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <form class=\"account-profile__form\" action=\"#\" method=\"get\" enctype=\"multipart/form-data\" id=\"account-profile__form\">\r\n            <div class=\"account-profile__form__input\" id=\"account-profile__form__input\">\r\n\r\n            </div>\r\n            <div class=\"account-profile__button-area\" id=\"account-profile__button-area\">\r\n\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
templates['account-sidebar.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"account-sidebar\" id=\"account-sidebar\">\r\n    <div class=\"account-sidebar__frame\">\r\n        <div class=\"accounts\">\r\n            <div class=\"account-sidebar__item account-sidebar__avatar__active-user\">\r\n                <a class=\"account-sidebar__avatar account-sidebar__avatar__hover-active\" href=\"/profile\" aria-label=\"Сменить аватар\">\r\n                    <img class=\"account-sidebar__avatar-img\" src="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"avatar") : depth0), depth0))
    + " alt=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"login") : depth0), depth0))
    + "\">\r\n                </a>\r\n                <div class=\"account-sidebar__text\">\r\n                    <div class=\"account-sidebar__title\" >\r\n                        <div class=\"account-sidebar__name\" aria-label=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"firstName") : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"lastName") : depth0), depth0))
    + "\">\r\n                            "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"firstName") : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"lastName") : depth0), depth0))
    + "\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"account-sidebar__desc\" aria-label=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"login") : depth0), depth0))
    + "\">\r\n                        "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"login") : depth0), depth0))
    + "\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <hr class=\"account-sidebar__hr\" id=\"account-sidebar__hr\">\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
templates['letterList.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"letterList\">\r\n\r\n</div>\r\n";
},"useData":true});
templates['mail.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":7,"column":29},"end":{"line":7,"column":36}}}) : helper)))
    + " class=\"mail__image\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"from_user") || (depth0 != null ? lookupProperty(depth0,"from_user") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_user","hash":{},"data":data,"loc":{"start":{"line":7,"column":62},"end":{"line":7,"column":75}}}) : helper)))
    + "\">\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img src='img/female-avatar.png' class=\"mail__image\" alt=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"from_user") || (depth0 != null ? lookupProperty(depth0,"from_user") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"from_user","hash":{},"data":data,"loc":{"start":{"line":9,"column":78},"end":{"line":9,"column":91}}}) : helper)))
    + "\">\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"mail mail_size mail_color\">\r\n\r\n            <div class=\"mail__header mail__header_size\">\r\n\r\n                <div class=\"mail__read-state\"></div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"img") : depth0),{"name":"if","hash":{"includeZero":true},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":6,"column":16},"end":{"line":10,"column":23}}})) != null ? stack1 : "")
    + "\r\n                <div class=\"mail__header-details\">\r\n                    <div class=\"mail__author\">\r\n                        <p class=\"mail__contact font-normal-0\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"from_user") || (depth0 != null ? lookupProperty(depth0,"from_user") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_user","hash":{},"data":data,"loc":{"start":{"line":14,"column":63},"end":{"line":14,"column":78}}}) : helper)))
    + "</p>\r\n                        <p class=\"mail__date font-normal-0\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":15,"column":60},"end":{"line":15,"column":70}}}) : helper)))
    + "</p>\r\n                    </div>\r\n                    <div class=\"mail__recipients\">\r\n                        <p class=\"font-normal-0\">to: "
    + alias4(((helper = (helper = lookupProperty(helpers,"recipient") || (depth0 != null ? lookupProperty(depth0,"recipient") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recipient","hash":{},"data":data,"loc":{"start":{"line":18,"column":53},"end":{"line":18,"column":66}}}) : helper)))
    + "</p>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"mail__content mail__content_color\"></div>\r\n\r\n\r\n\r\n\r\n    <div class=\"mail__bottom-actions mail__bottom-actions_size mail__bottom-actions_color\">\r\n\r\n    </div>\r\n</div>\r\n\r\n";
},"useData":true});
templates['mail-area.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"mail-area\">\r\n    <div class=\"mail-area__vertical-line\" style=\"order: 1\">\r\n    </div>\r\n</div>\r\n\r\n\r\n";
},"useData":true});
templates['menu.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"menu\">\r\n    <div id=\"common-menu-buttons\" class=\"menu__button-compose\">\r\n\r\n    </div>\r\n    <div class=\"menu__delimiter\"></div>\r\n    <div id=\"advanced-menu-buttons\" class=\"menu__button-compose\">\r\n\r\n    </div>\r\n    <div class=\"menu__delimiter\"></div>\r\n</div>";
},"useData":true});
templates['navbar.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header id=\"header\" class=\"navbar\">\r\n    <div class=\"navbar__frame-left\">\r\n        <a class=\"navbar__emblem-button\" href=\"/\">\r\n            <svg width=\"40px\" height=\"40px\" viewBox=\"0 0 55 55\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                <path d=\"M16.4537 33.3434L1.99634 50.987V24.2793L16.4537 33.3434Z\" fill=\"#88BDFD\"/>\r\n                <path d=\"M18.159 34.4133L26.9531 39.9261L35.8401 34.3545L50.6726 52.4568H3.37256L18.159 34.4133Z\"\r\n                      fill=\"#88BDFD\"/>\r\n                <path d=\"M37.5452 33.2846L51.9099 24.2793V50.8168L37.5452 33.2846Z\" fill=\"#88BDFD\"/>\r\n                <path d=\"M50.7476 22.6525L45.5349 25.9208V20.4678L50.7476 22.6525Z\" fill=\"#5336C7\"/>\r\n                <path d=\"M9.37036 27.724V1.54492H44.5364V27.724L26.9535 38.7477L9.37036 27.724Z\" fill=\"white\"/>\r\n                <path d=\"M21.7611 10.4395C24.0734 10.4395 25.955 12.3197 25.955 14.63C25.955 15.1814 26.4012 15.6284 26.9531\r\n            15.6284C27.505 15.6284 27.9516 15.1814 27.9516 14.63C27.9516 12.3197 29.8318 10.4395 32.1437 10.4395C34.4558\r\n            10.4395 36.336 12.3197 36.336 14.63C36.336 15.7952 35.8586 16.8822 34.9918 17.6907C34.9461 17.7329 34.9058\r\n            17.7785 34.8697 17.8272L26.9531 25.7428L19.0389 17.8293C19.0038 17.7811 18.963 17.7359 18.9182 17.6942C18.0488\r\n             16.8827 17.5688 15.7947 17.5688 14.63C17.5688 12.3197 19.4495 10.4395 21.7611 10.4395Z\" fill=\"#5336C7\"/>\r\n                <path d=\"M8.37217 25.9208L3.15869 22.6525L8.37217 20.4678V25.9208Z\" fill=\"#5336C7\"/>\r\n                <path d=\"M26.953 28.1534C26.6976 28.1534 26.4423 28.0555 26.2472 27.8606L17.5193 19.1331C17.4899 19.1037\r\n             17.4626 19.073 17.4372 19.041C16.2334 17.86 15.5723 16.3005 15.5723 14.6303C15.5723 11.219 18.3488 8.44336\r\n             21.7611 8.44336C23.933 8.44336 25.8475 9.56733 26.953 11.2641C28.0577 9.56733 29.9713 8.44336 32.1436\r\n             8.44336C35.5569 8.44336 38.333 11.219 38.333 14.6303C38.333 16.3013 37.6732 17.8605 36.472 19.0384C36.4464\r\n              19.0717 36.4184 19.1033 36.3878 19.1331L27.6587 27.8606C27.4636 28.0555 27.2083 28.1534 26.953\r\n              28.1534ZM19.0389 17.8297L26.953 25.7431L34.8689 17.8276C34.9059 17.7789 34.9472 17.7332 34.9917\r\n               17.6911C35.8587 16.8826 36.3359 15.7956 36.3359 14.6303C36.3359 12.3201 34.4557 10.4398 32.1436\r\n                10.4398C29.8317 10.4398 27.9515 12.3201 27.9515 14.6303C27.9515 15.1818 27.5049 15.6288 26.953\r\n                15.6288C26.4011 15.6288 25.9552 15.1818 25.9552 14.6303C25.9552 12.3201 24.0733 10.4398 21.7611\r\n                10.4398C19.4495 10.4398 17.5689 12.3201 17.5689 14.6303C17.5689 15.7951 18.0488 16.883 18.9182\r\n                17.6946C18.963 17.7363 19.0038 17.7815 19.0389 17.8297Z\" fill=\"#393939\"/>\r\n                <path d=\"M51.4381 53.3923L34.9729 33.2972L36.5169 32.0312L52.9823 52.1264L51.4381 53.3923Z\"\r\n                      fill=\"#393939\"/>\r\n                <path d=\"M26.9533 39.9268L0.467773 23.322L1.52858 21.6309L26.9533 37.5694L52.3787 21.6309L53.4386\r\n            23.322L26.9533 39.9268Z\" fill=\"#393939\"/>\r\n                <path d=\"M53.9069 54.4545H0V21.8122L9.26397 17.9287L10.0361 19.7705L1.99655\r\n            23.1401V52.4575H51.91V23.1401L43.8694 19.7705L44.6417 17.9287L53.9069 21.8122V54.4545Z\" fill=\"#393939\"/>\r\n                <path d=\"M45.5344 27.5006H43.5376V2.54387H10.3684V27.5006H8.37183V0.546875H45.5344V27.5006Z\"\r\n                      fill=\"#393939\"/>\r\n                <path d=\"M2.60764 53.3923L1.06348 52.1264L17.53 32.0312L19.0743 33.2972L2.60764 53.3923Z\"\r\n                      fill=\"#393939\"/>\r\n            </svg>\r\n\r\n            <p class=\"font-normal-0\">MailBox</p>\r\n        </a>\r\n\r\n    </div>\r\n    <div class=\"navbar__frame-right\">\r\n\r\n    </div>\r\n</header>";
},"useData":true});
templates['promo-box.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"promo-box promo-box_size promo-box_indent promo-box_color\">\r\n    <div class=\"promo-box__box\">\r\n        <h1 class=\"promo-box__title promo-box__title_color promo-box_indent\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</h1>\r\n        <ul class=\"promo-box__list\" id=\"promo-box__list\">\r\n\r\n        </ul>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
templates['wrapper-access.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"wrapper-access wrapper-access_color\">\r\n    <div class=\"wrapper-access__box\">\r\n        <div class=\"wrapper-access__titleIcon\">\r\n            <div class=\"icon\">\r\n                <svg class=\"favicon\" height=100% viewBox=\"0 0 232 138\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                    <rect width=\"232\" height=\"138\" fill=\"#5336C7\"/>\r\n                    <path d=\"M71 48.3282L8 123.214V9.85715L71 48.3282Z\" fill=\"#88BDFD\"/>\r\n                    <path d=\"M78.0847 52.4928L116.199 75.9069L154.716 52.2429L219 129.129H14L78.0847 52.4928Z\" fill=\"#88BDFD\"/>\r\n                    <path d=\"M161 47.9892L224 9.85715V122.229L161 47.9892Z\" fill=\"#88BDFD\"/>\r\n                    <path d=\"M223 4.92856H9L116 67.0286L223 4.92856Z\" fill=\"#88BDFD\"/>\r\n                    <path d=\"M221.484 133.071L152 48.688L158.516 43.3714L228 127.755L221.484 133.071Z\" fill=\"#393939\"/>\r\n                    <path d=\"M115.943 76.8857L0 8.04905V0L115.943 66.8803L232 0V8.04905L115.943 76.8857Z\" fill=\"#393939\"/>\r\n                    <path d=\"M232 138H116.511H0V0H232L223.406 5.58124H8.5926V128.802H223.406V5.58124L232 0V138Z\" fill=\"#393939\"/>\r\n                    <path d=\"M10.6016 133.071L4 127.755L74.3979 43.3714L81 48.688L10.6016 133.071Z\" fill=\"#393939\"/>\r\n                </svg>\r\n            </div>\r\n            <p class=\"wrapper-access__titleIconText\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</p>\r\n        </div>\r\n        <div>\r\n            <form action=\"#\" method=\"get\" enctype=\"multipart/form-data\" id=\"wrapper-access__form\">\r\n\r\n            </form>\r\n        </div>\r\n        <div class=\"wrapper-access__redirectBottomText\">\r\n            <p>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"bottomText") : depth0), depth0))
    + "</p>\r\n            <a id=\"redirect-link\" class=\"redirect-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"bottomLink") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"bottomLinkText") : depth0), depth0))
    + "</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
})();