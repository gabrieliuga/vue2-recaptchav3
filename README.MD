Vue2 Google Recaptcha V3

Usage in form:
```
<form>
<input type="hidden" name="token" v-model="googleToken" />
<GoogleCaptcha sitekey="yourSiteKey" action="yourPageAction" v-on:google_captcha_token="updateToken" ref="captcha"></GoogleCaptcha>
</form>
```

Import statement and event handling:

```
<script>
import GoogleCaptcha from 'vue2-recaptchav3';
export default {
    data(){
        return {
            googleToken: null,
            ...
        }
    },
    methods: {
        updateToken(payload){
          this.googleToken = payload.response_token;
        },
        formSubmit(){
            this.$refs.captcha.generateManualToken().then((token) => {
                //use token here
            });
        }
        ...
    }
}
</script>

```

Every time the action changes a new token is generated. 

This allows you to generate tokens based on the page the user is on or based on each individual form
