<script>
    // eslint-disable-next-line
    let _ = require('lodash');
    export default {
        props: ['sitekey', 'action'],
        data() {
            return {
                runs: 0,
                script_added: false,
            }
        },
        watch: {
            // eslint-disable-next-line
            action: function (newAction, oldAction) {
                setTimeout(() => {
                    this.runs = 0;
                    this.generateToken()
                }, 10);
            }
        },
        mounted() {
            if (!_.isUndefined(this.sitekey) && this.script_added === false) {
                let recaptchaScript = document.createElement('script');
                recaptchaScript.setAttribute('src', `https://www.google.com/recaptcha/api.js?render=${this.sitekey}`);
                document.head.appendChild(recaptchaScript);
                setTimeout(() => {
                    this.generateToken()
                }, 10);
                this.script_added = true;
            } else {
                // eslint-disable-next-line
                console.log('Provide SiteKey for Google Recaptcha')
            }
        },
        methods: {
            generateToken() {
                if (!_.isUndefined(window['grecaptcha'])) {
                    window['grecaptcha'].ready(() => {
                        window['grecaptcha'].execute(this.sitekey, {action: this.action}).then((token) => {
                            this.$emit('google_captcha_token', {
                                'response_token': token
                            });

                        });
                    });
                } else {
                    setTimeout(() => {
                        this.runs++;
                        this.generateToken()
                    }, 10);
                }
            },
            generateManualToken() {
                return window['grecaptcha'].execute(this.sitekey, {action: this.action});
            },
            isHidden() {
                if (this.hidden === 'true') {
                    return true;
                }
                return false;
            }
        },
        template: '',
        render() {
            return '';
        }
    }
</script>
