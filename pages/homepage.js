const {Key} = require('selenium-webdriver');
var BaseClass = require ('../pages/baseclass');

class HomePage extends BaseClass {

    usernameFieldID = 'worrior_username';
    createWarriorButtonID = 'warrior';
    startButtonID = 'start';

    async enter_username(username){
        await this.enterTextById(this.usernameFieldID, username);
    }

    async click_create_button(){
        await this.clickById(this.createWarriorButtonID);
    }

    async click_start_button(){
        await this.clickById(this.startButtonID);
    }

    async scrollToTextBox(){
        await this.scrollElementIntoViewById(this.usernameFieldID);
    }
}

module.exports = new HomePage();