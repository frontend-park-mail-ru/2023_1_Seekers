

class DateUtil {
    getMonth = (month: number) => {
        switch (month) {
        case 0:
            return 'янв';

        case 1:
            return 'фев';

        case 2:
            return 'мар';

        case 3:
            return 'апр';

        case 4:
            return 'мая';

        case 5:
            return 'июн';

        case 6:
            return 'июл';

        case 7:
            return 'авг';

        case 8:
            return 'сен';

        case 9:
            return 'окт';

        case 10:
            return 'ноя';

        case 11:
            return 'дек';
        }
        return {};
    };

    padTo2Digits = (num: number) => {
        return num.toString().padStart(2, '0');
    };
}

export const dateUtil = new DateUtil();
