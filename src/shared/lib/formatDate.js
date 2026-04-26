function formatDate(dateString, withTime = false) {

    const date = new Date(dateString);

    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    };

    if (withTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }

    return date.toLocaleDateString('uk-UA', options);
}

export default formatDate;