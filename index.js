module.exports = {
    website: {
        assets: './book',
        js: [
            'plugin.js'
        ]
    },
    hooks: {
        "page:before": function (page) {
            if (page.name != "SUMMARY.md") {
                var location = this.config.get("pluginConfig").customizableLastModified.location;

                if (!(location)) {
                    location = this.config.get('pluginsConfig').customizableLastModified.location;
                }

                console.log(location);

                var content = page.content;

                if (location == "top") {
                    content = `>*Last modified: {{ file.mtime }}*\n\n----\n\n${content}`;
                }
                else if (location == "bottom") {
                    content = `${content}\n\n----\n\n>*Last modified: {{ file.mtime }}*`;
                }
                else if (location == "underTitle") {
                    // todo
                }
                page.content = content;
            }
            return page;
        }
    }
};