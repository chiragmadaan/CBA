var BaseClass = require ('../pages/baseclass');

class LeaderboardPage extends BaseClass {

    url = '/leaderboard';
    title = 'COVID-19 THE GAME - LEADERBOARD';
    headerID = 'myHeader';
    tickerItemClass = 'ticker-item';
    tickerItems = ['Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.',
                    'Maintain at least 1 metre (3 feet) distance between yourself and others.',
                    'Avoid going to crowded places.',
                    'Avoid touching eyes, nose and mouth.',
                    'Stay home and self-isolate even with minor symptoms such as cough, headache, mild fever, until you recover.',
                    'Keep up to date on the latest information from trusted sources.',
                    'Visit WHO.int for more information.']
    continueFightingButtonID = 'leaderboard_link';
    tableID = 'showData';

    async click_continue_button(){
        await this.clickById(this.continueFightingButtonID);
    }

    async scrollToContinueButton(){
        await this.scrollElementIntoViewById(this.continueFightingButtonID);
    }
}

module.exports = new LeaderboardPage();