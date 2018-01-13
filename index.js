module.exports = {
    hooks: {
        "page:before": function (page) {
            if (page.name != "SUMMARY.md") {
                // get the default location
                var location = this.config.get('pluginsConfig').customizableLastModified.location;

                // check if the user has defined where to place the last modified date
                var pluginConfig = this.config.get("pluginConfig");

                if( (typeof pluginConfig != "undefined" && pluginConfig !== null) &&
                    (typeof(pluginConfig.customizableLastModified) != "undefined" && typeof(pluginConfig.customizableLastModified) !== null) &&
                    (typeof(pluginConfig.customizableLastModified.location) != "undefined" && typeof(pluginConfig.customizableLastModified.location) !== null) ) {
                    location = this.config.get('pluginConfig').customizableLastModified.location;
                }

                var content = page.content;

                if (location.toLowerCase() == "top") {
                    content = `>*Last modified: {{ file.mtime }}*\n\n----\n\n${content}`;
                }
                else if (location.toLowerCase() == "bottom") {
                    content = `${content}\n\n----\n\n>*Last modified: {{ file.mtime }}*`;
                }
                else if (location.toLowerCase() == "undertitle") {
                    // todo
                }
                else {
                    console.warn('Invalid lastModifiedLocation Found! Value was: ' + location);
                }

                page.content = content;
            }

            return page;
        }
    }
};
