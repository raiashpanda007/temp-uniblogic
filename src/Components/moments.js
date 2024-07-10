import moment from 'moment';
export const convertDate = (date) => {
    return moment(date).fromNow();
}