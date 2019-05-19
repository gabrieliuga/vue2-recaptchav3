<script>
    // eslint-disable-next-line
    let _ = require('lodash');
    export default {
        props: ['sitekey', 'action'],
        data() {
            return {
                runs: 0
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
        created: function () {
            if (!_.isUndefined(this.sitekey)) {
                let recaptchaScript = document.createElement('script');
                recaptchaScript.setAttribute('src', `https://www.google.com/recaptcha/api.js?render=${this.sitekey}`);
                document.head.appendChild(recaptchaScript);
                setTimeout(() => {
                    this.generateToken()
                }, 10);
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
            isHidden(){
                if(this.hidden === 'true'){
                    return true;
                }
                return false;
            }
        },
        template: '',
        render() { return ''; }
    }
</script>
