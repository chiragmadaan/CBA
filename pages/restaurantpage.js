var BaseClass = require ('../pages/baseclass');

class BusPage extends BaseClass {

    url = '/restaurant';
    introModalID = 'restaurant_intro_modal';
    startButtonID = 'restaurant_timer_start';
    incorrectModalID = 'restaurant_incorrect_modal';
    tryAgainButtonID = 'close_incorrect_modal_btn';
    correctModalID = 'restaurant_correct_modal';
    tryNextBattleButtonID = 'close_correct_modal_btn';
    checkFinalScoreButtonID = 'leaderboard_link';
    outOfTimeModalID = 'restaurant_out_of_time_modal';
    firstOptionID = 'restaurant_answer_1';
    secondOptionID = 'restaurant_answer_2';
    progressbarID1 = 'restaurant_progress';
    progressbarID2 = 'restaurant_bar';

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