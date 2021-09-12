var BaseClass = require ('../pages/baseclass');

class GamePage extends BaseClass {

    url = '/covid';
    areYouGameButtonID = 'news';
    takeTheBusButtonID = 'bus';
    goToAPublicPlaceButtonID = 'restaurant';
    goToTheOfficeButtonID = 'office';

    async click_game_button(){
        await this.clickById(this.areYouGameButtonID);
    }

    async click_bus_button(){
        await this.clickById(this.takeTheBusButtonID);
    }

    async click_public_place_button(){
        await this.clickById(this.goToAPublicPlaceButtonID);
    }

    async click_office_button(){
        await this.clickById(this.goToTheOfficeButtonID);
    }

    async scrollToNewsButton(){
        await this.scrollElementIntoViewById(this.areYouGameButtonID);
    }

    async scrollToBusButton(){
        await this.scrollElementIntoViewById(this.takeTheBusButtonID);
    }

    async scrollToPublicPlaceButton(){
        await this.scrollElementIntoViewById(this.goToAPublicPlaceButtonID);
    }

    async scrollToOfficeButton(){
        await this.scrollElementIntoViewById(this.goToTheOfficeButtonID);
    }
}

module.exports = new GamePage();