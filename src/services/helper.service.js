export default class HelperService {
    static interpolatedHtml(user, html) {
        if (!html || !user) {
            return html;
        }
        return html.replace(/{{(.*?)}}/g, (match, key) => {
            const keys = key.trim().split('.');
            let value = user;
            for (const k of keys) {
                if (value && Object.hasOwn(value, k)) {
                    value = value[k];
                }
            }
            return value;
        });
    }
}