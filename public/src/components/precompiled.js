(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['LetterList.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n        <div class=\"letter-frame\">\r\n            <div class=\"letter-read-state-frame\"></div>\r\n            <div class=\"letter-content-frame\">\r\n                <div class=\"letter-content-header-frame\">\r\n                    <div class=\"letter-content-header-image-frame\">\r\n                        <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":12,"column":33},"end":{"line":12,"column":40}}}) : helper)))
    + " class=\"letter-content-image-letter\" alt=\"\">\r\n                    </div>\r\n                    <div class=\"letter-content-header-text-frame\">\r\n                        <label class=\"letter-content-header-name-text\">\r\n                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":16,"column":28},"end":{"line":16,"column":36}}}) : helper)))
    + "\r\n                        </label>\r\n                        <div class=\"letter-content-header-text-bottom-frame\">\r\n                            <label class=\"letter-content-header-second-text\">\r\n                                "
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":20,"column":32},"end":{"line":20,"column":41}}}) : helper)))
    + "\r\n                            </label>\r\n                            <label class=\"letter-content-header-second-text\" style=\"text-align: right\">\r\n                                "
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":23,"column":32},"end":{"line":23,"column":40}}}) : helper)))
    + "\r\n                            </label>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"letter-content-text-frame\">\r\n                    <label class=\"letter-content-text\">\r\n                        "
    + alias4(((helper = (helper = lookupProperty(helpers,"content") || (depth0 != null ? lookupProperty(depth0,"content") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data,"loc":{"start":{"line":31,"column":24},"end":{"line":31,"column":35}}}) : helper)))
    + "\r\n                    </label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"./src/components/LetterList/LetterFrame.css\" type=\"text/css\">\r\n<link rel=\"stylesheet\" href=\"./src/components/LetterList/LetterList.css\" type=\"text/css\">\r\n\r\n<div class=\"LetterList\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"letterFrames") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":37,"column":13}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true});
templates['Menu.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a class=\"menu-button\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data,"loc":{"start":{"line":6,"column":37},"end":{"line":6,"column":45}}}) : helper)))
    + "\">\r\n            <div class=\"menu-button-left-frame\">\r\n                <div>\r\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":9,"column":20},"end":{"line":9,"column":29}}}) : helper)))
    + "\r\n                </div>\r\n                <div class=\"menu-button-text\">\r\n                    <label>"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":12,"column":27},"end":{"line":12,"column":37}}}) : helper)))
    + "</label>\r\n                </div>\r\n            </div>\r\n            <div class=\"menu-button-right-frame\">\r\n                <div class=\"menu-button-count\">\r\n                    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"count") || (depth0 != null ? lookupProperty(depth0,"count") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data,"loc":{"start":{"line":17,"column":23},"end":{"line":17,"column":34}}}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n        </a>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a class=\"menu-button\">\r\n            <div class=\"menu-button-left-frame\">\r\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":26,"column":16},"end":{"line":26,"column":25}}}) : helper)))
    + "\r\n                <div class=\"menu-button-text\">\r\n                    <label>"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":28,"column":27},"end":{"line":28,"column":37}}}) : helper)))
    + "</label>\r\n                </div>\r\n            </div>\r\n            <div class=\"menu-button-right-frame\">\r\n                <div class=\"menu-button-count\">\r\n                    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"count") || (depth0 != null ? lookupProperty(depth0,"count") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data,"loc":{"start":{"line":33,"column":23},"end":{"line":33,"column":34}}}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n        </a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"./src/components/Menu/Menu.css\" type=\"text/css\">\r\n<link rel=\"stylesheet\" href=\"./src/components/Menu/MenuButton.css\" type=\"text/css\">\r\n\r\n<div class=\"Menu\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"commonButtons") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":21,"column":13}}})) != null ? stack1 : "")
    + "    <div class=\"MenuDelimeter\"></div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"advancedButtons") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":4},"end":{"line":37,"column":13}}})) != null ? stack1 : "")
    + "    <div class=\"MenuDelimeter\"></div>\r\n</div>";
},"useData":true});
templates['Navbar.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"./src/components/Navbar/Navbar.css\" type=\"text/css\">\r\n<link rel=\"stylesheet\" href=\"./src/components/Navbar/iconButton.css\" type=\"text/css\">\r\n\r\n<div class=\"navbar-frame-left\">\r\n    <a href=\"\">\r\n        <div class=\"navbar-emblem-button\">\r\n            <img src=\"./img/emblem.svg\" alt=\"\">\r\n            <label class=\"navbar-text\">MailBox</label>\r\n        </div>\r\n    </a>\r\n    <a href=\"\">\r\n\r\n    </a>\r\n</div>\r\n<div class=\"navbar-frame-right\">\r\n    <a class=\"icon-button\">\r\n        <svg class=\"icon-button-icon\" fill=\"none\" height=100% viewBox=\"0 0 20 20\" width=100%\r\n             xmlns=\"http://www.w3.org/2000/svg\">\r\n            <g stroke-width=\"1\">\r\n                <path d=\"m17.4142 2.58579c-.781-.78105-2.0474-.78105-2.8284 0l-7.5858\r\n                    7.58581v2.8284h2.82842l7.58578-7.58579c.7811-.78105.7811-2.04738 0-2.82842z\"/>\r\n                <path clip-rule=\"evenodd\" d=\"m2 6c0-1.10457.89543-2 2-2h4c.55228 0 1 .44772 1\r\n                    1s-.44772 1-1 1h-4v10h10v-4c0-.5523.4477-1 1-1s1 .4477 1 1v4c0 1.1046-.8954\r\n                    2-2 2h-10c-1.10457 0-2-.8954-2-2z\" fill-rule=\"evenodd\"/>\r\n            </g>\r\n        </svg>\r\n\r\n    </a>\r\n    <a class=\"icon-button\">\r\n        <svg class=\"icon-button-icon\" fill=\"none\" height=100% viewBox=\"0 0 24 24\" width=100%\r\n             xmlns=\"http://www.w3.org/2000/svg\">\r\n            <path d=\"m13 16h-1v-4h-1m1-4h.01m8.99 4c0 4.9706-4.0294 9-9 9-4.97056 0-9-4.0294-9-9 0-4.97056\r\n                    4.02944-9 9-9 4.9706 0 9 4.02944 9 9z\" stroke-linecap=\"round\"\r\n                  stroke-linejoin=\"round\" stroke-width=\"2\"/>\r\n        </svg>\r\n    </a>\r\n    <a class=\"icon-button\">\r\n        <svg class=\"icon-button-icon\" fill=\"none\" height=100% viewBox=\"0 0 24 24\" width=100%\r\n             xmlns=\"http://www.w3.org/2000/svg\">\r\n            <g stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\">\r\n                <path d=\"m10.3246 4.31731c.4264-1.75641 2.9244-1.75641 3.3508 0 .2754 1.13462 1.5753\r\n                        1.67307 2.5724 1.06554 1.5435-.94046 3.3098.82585 2.3694 2.36933-.6076.99707-.0691\r\n                        2.29702 1.0655 2.57242 1.7564.4264 1.7564 2.9244 0 3.3508-1.1346.2754-1.6731\r\n                        1.5753-1.0655 2.5724.9404 1.5435-.8259 3.3098-2.3694 2.3694-.9971-.6076-2.297-.0691-2.5724\r\n                        1.0655-.4264 1.7564-2.9244 1.7564-3.3508\r\n                        0-.2754-1.1346-1.57534-1.6731-2.57241-1.0655-1.54349.9404-3.3098-.8259-2.36934-2.3694.60753-.9971.06908-2.297-1.06554-2.5724-1.75641-.4264-1.75641-2.9244\r\n                        0-3.3508 1.13462-.2754 1.67306-1.57534 1.06554-2.57242-.94046-1.54348.82585-3.30979 2.36934-2.36933.99707.60752 2.29701.06908\r\n                        2.57241-1.06554z\"/>\r\n                <path d=\"m15 12c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3431-3 3-3 3 1.3431 3 3z\"/>\r\n            </g>\r\n        </svg>\r\n    </a>\r\n    <a class=\"icon-button\">\r\n        <svg class=\"icon-button-icon\" fill=\"none\" height=100% viewBox=\"0 0 24 24\" width=100%\r\n             xmlns=\"http://www.w3.org/2000/svg\">\r\n            <path d=\"m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685\r\n                    0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1\"\r\n                  stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>\r\n        </svg>\r\n    </a>\r\n    <a class=\"navbar-img-button\">\r\n        <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"profileAvatar") || (depth0 != null ? lookupProperty(depth0,"profileAvatar") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"profileAvatar","hash":{},"data":data,"loc":{"start":{"line":62,"column":18},"end":{"line":62,"column":35}}}) : helper)))
    + "\" alt=\"\">\r\n    </a>\r\n</div>";
},"useData":true});
templates['Mail.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<link rel=\"stylesheet\" href=\"./src/components/Mail/Mail.css\" type=\"text/css\">\r\n\r\n\r\n<svg class=\"content-mail\" fill=\"none\" height=\"20\" viewBox=\"0 0 20 20\" width=\"20\"\r\n     xmlns=\"http://www.w3.org/2000/svg\">\r\n    <path clip-rule=\"evenodd\" d=\"m6 3c0-.55228.44772-1 1-1h.01c.55228 0\r\n                 1 .44772 1 1s-.44772 1-1 1h-.01c-.55228 0-1-.44772-1-1zm2 3c0-.55228-.44772-1-1-1s-1\r\n                 .44772-1 1v1c-1.10457 0-2 .89543-2 2v1c-1.10457 0-2 .8954-2 2v.6833c.36868.1033.72499.2649\r\n                 1.0547.4847.57243.3816 1.31817.3816 1.8906 0 1.24423-.8295 2.86517-.8295 4.1094 0 .57243.3816\r\n                 1.3182.3816 1.8906 0 1.2442-.8295 2.8652-.8295 4.1094 0 .5724.3816 1.3182.3816 1.8906 0\r\n                 .3297-.2198.686-.3814 1.0547-.4847v-.6833c0-1.1046-.8954-2-2-2v-1c0-1.10457-.8954-2-2-2v-1c0-.55228-.4477-1-1-1s-1\r\n                 .44772-1 1v1h-1v-1c0-.55228-.4477-1-1-1-.55228 0-1\r\n                 .44772-1 1v1h-1zm10 8.8679c-1.2367.7935-2.8286.7816-4.0547-.0358-.5724-.3816-1.3182-.3816-1.8906\r\n                 0-1.2442.8295-2.86517.8295-4.1094 0-.57243-.3816-1.31817-.3816-1.8906\r\n                 0-1.22607.8174-2.81795.8293-4.0547.0358v2.1321c0 .5523.44772 1 1 1h14c.5523 0 1-.4477\r\n                 1-1zm-9-11.8679c0-.55228.44772-1 1-1h.01c.5523 0 1 .44772 1 1s-.4477 1-1 1h-.01c-.55228\r\n                 0-1-.44772-1-1zm3 0c0-.55228.4477-1 1-1h.01c.5523 0 1 .44772 1 1s-.4477 1-1 1h-.01c-.5523 0-1-.44772-1-1z\"\r\n          fill-rule=\"evenodd\"/>\r\n</svg>";
},"useData":true});
})();