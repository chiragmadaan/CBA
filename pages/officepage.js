var BaseClass = require ('../pages/baseclass');

class BusPage extends BaseClass {

    url = '/bus';
    startButtonID = 'start';
    introModalID = 'off_intro_modal';
    incorrectModalID = 'off_incorrect_modal';
    tryAgainButtonID = 'close_modal_btn_2';
    correctModalID = 'off_correct_modal';
    tryNextBattleButtonID = 'close_modal_btn_1';
    checkFinalScoreButtonID = 'leaderboard_link';
    outOfTimeModalID = 'off_out_of_time_modal';
    firstOptionID = 'office_answer_1';
    secondOptionID = 'office_answer_2';
    progressbarID1 = 'myProgress';
    progressbarID2 = 'myBar';

    async click_start_button(){
        await this.clickById(this.startButtonID);
    }

    async click_try_again_button(){
        await this.clickById(this.tryAgainButtonID);
    }

    async click_try_next_battle_button(){
        await this.clickById(this.tryNextBattleButtonID);
    }

    async click_final_score_button(){
        await this.clickById(this.checkFinalScoreButtonID);
    }

    async select_first_option(){
        await this.clickById(this.firstOptionID);
    }

    async select_second_option(){
        await this.clickById(this.secondOptionID);
    }
}

module.exports = new BusPage();