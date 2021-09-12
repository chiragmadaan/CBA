var BaseClass = require ('../pages/baseclass');

class BusPage extends BaseClass {

    url = '/bus';
    startButtonID = 'bus_timer_start';
    introModalID = 'bus_intro_modal';
    incorrectModalID = 'bus_incorrect_modal';
    tryAgainButtonID = 'close_incorrect_modal_btn';
    correctModalID = 'bus_correct_modal';
    tryNextBattleButtonID = 'close_correct_modal_btn';
    checkFinalScoreButtonID = 'leaderboard_link';
    outOfTimeModalID = 'bus_out_of_time_modal';
    timeOutTryAgainButtonID = 'retry';
    firstOptionID = 'bus_answer_1';
    secondOptionID = 'bus_answer_2';
    progressbarID1 = 'bus_progress';
    progressbarID2 = 'bus_bar';

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