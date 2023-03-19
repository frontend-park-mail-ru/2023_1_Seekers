(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['button.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"button-classic button-classic_indent\">\r\n    <button class=\"button-classic_size-l button-classic_color\" type=\"submit\">\r\n        <label class=\"button-classic__label\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"buttonText") : depth0), depth0))
    + "</label>\r\n    </button>\r\n</div>\r\n";
},"useData":true});
templates['checkbox.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"remember\">\r\n<label>\r\n    <input class=\"checkbox-input\" type=\"checkbox\" name=\"remember\">\r\n    <span class=\"font-normal-0\">Запомнить</span>\r\n</label>\r\n<a class=\"font-normal-0 redirect-link\" href=\"/remind\"> Забыли пароль?</a>\r\n</div>";
},"useData":true});
templates['form.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"input-form input-form_indent\">\r\n        <input class=\"input-form__size-l input-form__color\" type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\"\r\n               maxlength=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"maxlenght") : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" required/>\r\n        <span class=\"input-form__span input-form__span_indent input-form__span_size-l input-form__span_animation input-form__span_color\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</span>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"field") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":7,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['icon-button.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a class=\"icon-button icon-button_size icon-button_color\" href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data,"loc":{"start":{"line":1,"column":64},"end":{"line":1,"column":74}}}) : helper)))
    + "\">\r\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":15}}}) : helper))) != null ? stack1 : "")
    + "\r\n</a>\r\n";
},"useData":true});
templates['letter-frame.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":7,"column":29},"end":{"line":7,"column":36}}}) : helper)))
    + " class=\"letter-content-image-letter\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"from_user") || (depth0 != null ? lookupProperty(depth0,"from_user") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_user","hash":{},"data":data,"loc":{"start":{"line":7,"column":78},"end":{"line":7,"column":91}}}) : helper)))
    + "\">\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img src='img/female-avatar.png' class=\"letter-content-image-letter\" alt=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"from_user") || (depth0 != null ? lookupProperty(depth0,"from_user") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"from_user","hash":{},"data":data,"loc":{"start":{"line":9,"column":94},"end":{"line":9,"column":107}}}) : helper)))
    + "\">\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"letter-frame-id-"
    + alias4(((helper = (helper = lookupProperty(helpers,"message_id") || (depth0 != null ? lookupProperty(depth0,"message_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message_id","hash":{},"data":data,"loc":{"start":{"line":1,"column":25},"end":{"line":1,"column":39}}}) : helper)))
    + "\" class=\"letter-frame\">\r\n    <div class=\"letter-read-state-frame\"></div>\r\n    <div class=\"letter-content-frame\">\r\n        <div class=\"letter-content-header-frame\">\r\n            <div class=\"letter-content-header-image-frame\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"img") : depth0),{"name":"if","hash":{"includeZero":true},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":6,"column":16},"end":{"line":10,"column":23}}})) != null ? stack1 : "")
    + "            </div>\r\n            <div class=\"letter-content-header-text-frame\">\r\n                <label class=\"letter-content-header-name-text font-normal-0\">\r\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"from_user") || (depth0 != null ? lookupProperty(depth0,"from_user") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_user","hash":{},"data":data,"loc":{"start":{"line":14,"column":20},"end":{"line":14,"column":33}}}) : helper)))
    + "\r\n                </label>\r\n                <div class=\"letter-content-header-text-bottom-frame\">\r\n                    <label class=\"letter-content-header-second-text font-normal-0\">\r\n                        "
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":18,"column":24},"end":{"line":18,"column":33}}}) : helper)))
    + "\r\n                    </label>\r\n                    <label class=\"letter-content-header-second-text font-normal-0\" style=\"text-align: right\">\r\n                        "
    + alias4(((helper = (helper = lookupProperty(helpers,"creating_date") || (depth0 != null ? lookupProperty(depth0,"creating_date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creating_date","hash":{},"data":data,"loc":{"start":{"line":21,"column":24},"end":{"line":21,"column":41}}}) : helper)))
    + "\r\n                    </label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"letter-content-text-frame\">\r\n            <label class=\"letter-content-text font-caption-0\">\r\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":28,"column":16},"end":{"line":28,"column":24}}}) : helper)))
    + "\r\n            </label>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
templates['list-item.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li class=\"list-item\">\r\n        <div class=\"list-item__icon\">\r\n            <svg class=\"list-item__svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" height=50% width=50% viewBox=\"0 0 24 24\">\r\n                "
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"img") : depth0), depth0)) != null ? stack1 : "")
    + "\r\n            </svg>\r\n        </div>\r\n            <span class=\"list-item__text\">\r\n                "
    + container.escapeExpression(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "\r\n            </span>\r\n    </li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"field") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":12,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['mail-content.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"mail-content\">\r\n    <p class=\"font-title-2\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":2,"column":28},"end":{"line":2,"column":37}}}) : helper)))
    + "</p>\r\n    <p class=\"font-normal-0\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":3,"column":29},"end":{"line":3,"column":37}}}) : helper)))
    + "</p>\r\n</div>\r\n";
},"useData":true});
templates['menu-button.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a class=\"menu-button menu-button_color menu-button_size-m\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data,"loc":{"start":{"line":1,"column":66},"end":{"line":1,"column":76}}}) : helper)))
    + "\">\r\n    <div class=\"menu-button__left-frame\">\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":19}}}) : helper))) != null ? stack1 : "")
    + "\r\n            <p class=\"font-caption-0 menu-button__text_color\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":4,"column":62},"end":{"line":4,"column":72}}}) : helper)))
    + "</p>\r\n    </div>\r\n    <div class=\"menu-button__right-frame\">\r\n            <p class=\"font-caption-0 menu-button__text_color\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"count") || (depth0 != null ? lookupProperty(depth0,"count") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data,"loc":{"start":{"line":7,"column":62},"end":{"line":7,"column":73}}}) : helper)))
    + "</p>\r\n    </div>\r\n</a>\r\n";
},"useData":true});
templates['notification.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"notification-area\" id=\"error-label\">\r\n    <div class=\"notification-area__notification\">\r\n        <p class=\"notification-area__notificationText\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"notification") : depth0), depth0))
    + "</p>\r\n        <span class=\"progress\"></span>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
templates['profile-button.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <img class=\"profile-button__img profile-button__img_size\" src="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"img","hash":{},"data":data,"loc":{"start":{"line":4,"column":74},"end":{"line":4,"column":81}}}) : helper)))
    + " alt=\"\">\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <img class=\"profile-button__img profile-button__img_size\" src='img/female-avatar.png' alt=\"\">\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a class=\"profile-button profile-button_color profile-button_size\" href=\"/sidebar\">\r\n    <div class=\"profile-button__left-frame\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"img") : depth0),{"name":"if","hash":{"includeZero":true},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":15}}})) != null ? stack1 : "")
    + "            <p class=\"font-caption-0 profile-button__text_color\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"login") || (depth0 != null ? lookupProperty(depth0,"login") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"login","hash":{},"data":data,"loc":{"start":{"line":8,"column":65},"end":{"line":8,"column":76}}}) : helper)))
    + "</p>\r\n    </div>\r\n    <div class=\"profile-button__right-frame\">\r\n\r\n    </div>\r\n</a>\r\n";
},"useData":true});
templates['sidebar-linkButton.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" class=\"account-sidebar__item account-sidebar__item__hover-active\">\r\n        <div class=\"account-sidebar__icon\">\r\n            <svg class=\"account-sidebar__svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" height=50% width=50% viewBox=\"0 0 24 24\">\r\n                "
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"img") : depth0), depth0)) != null ? stack1 : "")
    + "\r\n            </svg>\r\n        </div>\r\n        <div class=\"account-sidebar__text\">\r\n            "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "\r\n        </div>\r\n    </a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"field") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":12,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();