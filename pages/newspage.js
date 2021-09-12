var BaseClass = require ('../pages/baseclass');

class NewsPage extends BaseClass {

    url = '/news';
    startButtonID = 'start';
    introModalID = 'introModal';
    incorrectModalID = 'incorrectModal';
    goHomeAndStartAgainButtonID = 'close_modal_btn_2';
    correctModalID = 'correctModal';
    continueButtonID = 'continue';
    firstOptionID = 'answer_1';
    secondOptionID = 'answer_2';
    progressbarID1 = 'progress';
    progressbarID2 = 'bar';

    async click_start_button(){
        await this.clickById(this.startButtonID);
    }

    async click_home_button(){
        await this.clickById(this.goHomeAndStartAgainButtonID);
    }

    async click_continue_button(){
        await this.clickById(this.continueButtonID);
    }

    async select_first_option(){
        await this.clickById(this.firstOptionID);
    }

    async select_second_option(){
        await this.clickById(this.secondOptionID);
    }
}

module.exports = new NewsPage();