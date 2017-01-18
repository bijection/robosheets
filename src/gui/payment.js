var addClass,
    cardFromNumber,
    cardFromType,
    cards,
    defaultFormat,
    formatBackCardNumber,
    formatBackExpiry,
    formatCardNumber,
    formatExpiry,
    formatForwardExpiry,
    formatForwardSlashAndSpace,
    hasClass,
    hasTextSelected,
    luhnCheck,
    reFormatCVC,
    reFormatCardNumber,
    reFormatExpiry,
    reFormatNumeric,
    removeClass,
    restrictCVC,
    restrictCardNumber,
    restrictExpiry,
    restrictNumeric,
    setCardType,
    toggleClass,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

hasClass = function(el, className) {
    if (el.classList != null) {
        return el.classList.contains(className);
    } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
};

removeClass = function(el, classNames) {
    var className, i, len, ref, results;
    ref = classNames.split(' ');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
        className = ref[i];
        if (el.classList != null) {
            results.push(el.classList.remove(className));
        } else {
            results.push(el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '));
        }
    }
    return results;
};

addClass = function(el, classNames) {
    var className, i, len, ref, results;
    ref = classNames.split(' ');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
        className = ref[i];
        if (el.classList != null) {
            results.push(el.classList.add(className));
        } else {
            results.push(el.className += ' ' + className);
        }
    }
    return results;
};

toggleClass = function(el, classNames, addOrRemove) {
    var className, i, len, ref, results;
    ref = classNames.split(' ');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
        className = ref[i];
        if (addOrRemove) {
            results.push(addClass(el, className));
        } else {
            results.push(removeClass(el, className));
        }
    }
    return results;
};

defaultFormat = /(\d{1,4})/g;

cards = [
    {
        type: 'visaelectron',
        pattern: /^4(026|17500|405|508|844|91[37])/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'maestro',
        pattern: /^(5(018|0[23]|[68])|6(39|7))/,
        format: defaultFormat,
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'forbrugsforeningen',
        pattern: /^600/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'dankort',
        pattern: /^5019/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'visa',
        pattern: /^4/,
        format: defaultFormat,
        length: [13, 16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'mastercard',
        pattern: /^5[0-5]/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'amex',
        pattern: /^3[47]/,
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        length: [15],
        cvcLength: [3, 4],
        luhn: true
    }, {
        type: 'dinersclub',
        pattern: /^3[0689]/,
        format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
        length: [14],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'discover',
        pattern: /^6([045]|22)/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'unionpay',
        pattern: /^(62|88)/,
        format: defaultFormat,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: false
    }, {
        type: 'jcb',
        pattern: /^35/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }
];

cardFromNumber = function(num) {
    var card, i, len;
    num = (num + '').replace(/\D/g, '');
    for (i = 0, len = cards.length; i < len; i++) {
        card = cards[i];
        if (card.pattern.test(num)) {
            return card;
        }
    }
};

cardFromType = function(type) {
    var card, i, len;
    for (i = 0, len = cards.length; i < len; i++) {
        card = cards[i];
        if (card.type === type) {
            return card;
        }
    }
};

luhnCheck = function(num) {
    var digit, digits, i, len, odd, sum;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (i = 0, len = digits.length; i < len; i++) {
        digit = digits[i];
        digit = parseInt(digit, 10);
        if ((odd = !odd)) {
            digit *= 2;
        }
        if (digit > 9) {
            digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
};

hasTextSelected = function(target) {
    var ref;
    if ((target.getAttribute('selectionStart') != null) && target.getAttribute('selectionStart') !== target.getAttribute('selectionEnd')) {
        return true;
    }
    if ((typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
        if (document.selection.createRange().text) {
            return true;
        }
    }
    return false;
};

reFormatNumeric = function(e) {
    var target;
    target = e.currentTarget;
    return setTimeout(function() {
        var value;
        value = target.value;
        value = value.replace(/\D/g, '');
        return target.value = value;
    });
};

reFormatCardNumber = function(e) {
    var target;
    target = e.currentTarget;
    return setTimeout(function() {
        var value;
        value = target.value;
        value = paymentHelpers.formatCardNumber(value);
        return target.value = value;
    });
};

formatCardNumber = function(e) {
    var card, digit, length, re, target, upperLength, value;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    target = e.currentTarget;
    value = target.value;
    card = cardFromNumber(value + digit);
    length = (value.replace(/\D/g, '') + digit).length;
    upperLength = 16;
    if (card) {
        upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
        return;
    }
    if ((target.getAttribute('selectionStart') != null) && target.getAttribute('selectionStart') !== value.length) {
        return;
    }
    if (card && card.type === 'amex') {
        re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
        re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value)) {
        e.preventDefault();
        return setTimeout(function() {
            return target.value = value + ' ' + digit;
        });
    } else if (re.test(value + digit)) {
        e.preventDefault();
        return setTimeout(function() {
            return target.value = value + digit + ' ';
        });
    }
};

formatBackCardNumber = function(e) {
    var target, value;
    target = e.currentTarget;
    value = target.value;
    if (e.which !== 8) {
        return;
    }
    if ((target.getAttribute('selectionStart') != null) && target.getAttribute('selectionStart') !== value.length) {
        return;
    }
    if (/\d\s$/.test(value)) {
        e.preventDefault();
        return setTimeout(function() {
            return target.value = value.replace(/\d\s$/, '');
        });
    } else if (/\s\d?$/.test(value)) {
        e.preventDefault();
        return setTimeout(function() {
            return target.value = value.replace(/\d$/, '');
        });
    }
};

reFormatExpiry = function(e) {
    var target;
    target = e.currentTarget;
    return setTimeout(function() {
        var value;
        value = target.value;
        value = paymentHelpers.formatExpiry(value);
        return target.value = value;
    });
};

formatExpiry = function(e) {
    var digit, target, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    target = e.currentTarget;
    val = target.value + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
        e.preventDefault();
        return setTimeout(function() {
            return target.value = "0" + val + " / ";
        });
    } else if (/^\d\d$/.test(val)) {
        e.preventDefault();
        return setTimeout(function() {
            return target.value = val + " / ";
        });
    }
};

formatForwardExpiry = function(e) {
    var digit, target, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    target = e.currentTarget;
    val = target.value;
    if (/^\d\d$/.test(val)) {
        return target.value = val + " / ";
    }
};

formatForwardSlashAndSpace = function(e) {
    var target, val, which;
    which = String.fromCharCode(e.which);
    if (!(which === '/' || which === ' ')) {
        return;
    }
    target = e.currentTarget;
    val = target.value;
    if (/^\d$/.test(val) && val !== '0') {
        return target.value = "0" + val + " / ";
    }
};

formatBackExpiry = function(e) {
    var target, value;
    target = e.currentTarget;
    value = target.value;
    if (e.which !== 8) {
        return;
    }
    if ((target.getAttribute('selectionStart') != null) && target.getAttribute('selectionStart') !== value.length) {
        return;
    }
    if (/\d\s\/\s$/.test(value)) {
        e.preventDefault();
        return setTimeout(function() {
            return target.value = value.replace(/\d\s\/\s$/, '');
        });
    }
};

reFormatCVC = function(e) {
    var target;
    target = e.currentTarget;
    return setTimeout(function() {
        var value;
        value = target.value;
        value = value.replace(/\D/g, '').slice(0, 4);
        return target.value = value;
    });
};

restrictNumeric = function(e) {
    var input;
    if (e.metaKey || e.ctrlKey) {
        return true;
    }
    if (e.which === 32) {
        return false;
    }
    if (e.which === 0) {
        return true;
    }
    if (e.which < 33) {
        return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
};

restrictCardNumber = function(e) {
    var card, digit, target, value;
    target = e.currentTarget;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    if (hasTextSelected(target)) {
        return;
    }
    value = (target.value + digit).replace(/\D/g, '');
    card = cardFromNumber(value);
    if (card) {
        return value.length <= card.length[card.length.length - 1];
    } else {
        return value.length <= 16;
    }
};

restrictExpiry = function(e) {
    var digit, target, value;
    target = e.currentTarget;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    if (hasTextSelected(target)) {
        return;
    }
    value = target.value + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 6) {
        return false;
    }
};

restrictCVC = function(e) {
    var digit, target, val;
    target = e.currentTarget;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    if (hasTextSelected(target)) {
        return;
    }
    val = target.value + digit;
    return val.length <= 4;
};

setCardType = function(e) {
    var allTypes, card, cardType, target, val;
    target = e.currentTarget;
    val = target.value;
    cardType = paymentHelpers.cardType(val) || 'unknown';
    if (!hasClass(target, cardType)) {
        allTypes = (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = cards.length; i < len; i++) {
                card = cards[i];
                results.push(card.type);
            }
            return results;
        })();
        removeClass(target, 'unknown');
        removeClass(target, allTypes.join(' '));
        addClass(target, cardType);
        toggleClass(target, 'identified', cardType !== 'unknown');
    }
};

export var payment = {}

payment.formatCardCVC = function(el) {
    el.addEventListener('keypress', restrictNumeric);
    el.addEventListener('keypress', restrictCVC);
    el.addEventListener('paste', reFormatCVC);
    el.addEventListener('change', reFormatCVC);
    el.addEventListener('input', reFormatCVC);
    return el;
};

payment.formatCardExpiry = function(el) {
    el.addEventListener('keypress', restrictNumeric);
    el.addEventListener('keypress', restrictExpiry);
    el.addEventListener('keypress', formatExpiry);
    el.addEventListener('keypress', formatForwardSlashAndSpace);
    el.addEventListener('keypress', formatForwardExpiry);
    el.addEventListener('keydown', formatBackExpiry);
    el.addEventListener('change', reFormatExpiry);
    el.addEventListener('input', reFormatExpiry);
    return el;
};

payment.formatCardNumber = function(el) {
    el.addEventListener('keypress', restrictNumeric);
    el.addEventListener('keypress', restrictCardNumber);
    el.addEventListener('keypress', formatCardNumber);
    el.addEventListener('keydown', formatBackCardNumber);
    el.addEventListener('keyup', setCardType);
    el.addEventListener('paste', reFormatCardNumber);
    el.addEventListener('change', reFormatCardNumber);
    el.addEventListener('input', reFormatCardNumber);
    el.addEventListener('input', setCardType);
    return el;
};

payment.restrictNumeric = function(el) {
    el.addEventListener('keypress', restrictNumeric);
    el.addEventListener('paste', reFormatNumeric);
    el.addEventListener('change', reFormatNumeric);
    el.addEventListener('input', reFormatNumeric);
    return el;
};

payment.cardExpiryVal = function() {
    return paymentHelpers.cardExpiryVal(this.value);
};

export var paymentHelpers = {}

paymentHelpers.cardExpiryVal = function(value) {
    var month, prefix, ref, year;
    value = value.replace(/\s/g, '');
    ref = value.split('/', 2), month = ref[0], year = ref[1];
    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
    }
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    return {
        month: month,
        year: year
    };
};

paymentHelpers.validateCardNumber = function(num) {
    var card, ref;
    num = (num + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) {
        return false;
    }
    card = cardFromNumber(num);
    if (!card) {
        return false;
    }
    return (ref = num.length, indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(num));
};

paymentHelpers.validateCardExpiry = function(month, year) {
    var currentTime, expiry, ref;
    if (typeof month === 'object' && 'month' in month) {
        ref = month, month = ref.month, year = ref.year;
    }
    if (!(month && year)) {
        return false;
    }
    month = month.toString();
    year = year.toString();
    month = month.trim();
    year = year.trim();
    if (!/^\d+$/.test(month)) {
        return false;
    }
    if (!/^\d+$/.test(year)) {
        return false;
    }
    if (!((1 <= month && month <= 12))) {
        return false;
    }
    if (year.length === 2) {
        if (year < 70) {
            year = "20" + year;
        } else {
            year = "19" + year;
        }
    }
    if (year.length !== 4) {
        return false;
    }
    expiry = new Date(year, month);
    currentTime = new Date;
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);
    return expiry > currentTime;
};

paymentHelpers.validateCardCVC = function(cvc, type) {
    var card, ref;
    cvc = cvc.trim();
    if (!/^\d+$/.test(cvc)) {
        return false;
    }
    card = cardFromType(type);
    if (card != null) {
        return ref = cvc.length, indexOf.call(card.cvcLength, ref) >= 0;
    } else {
        return cvc.length >= 3 && cvc.length <= 4;
    }
};

paymentHelpers.cardType = function(num) {
    var ref;
    if (!num) {
        return null;
    }
    return ((ref = cardFromNumber(num)) != null ? ref.type : void 0) || null;
};

paymentHelpers.formatCardNumber = function(num) {
    var card, groups, ref, upperLength;
    num = num.replace(/\D/g, '');
    card = cardFromNumber(num);
    if (!card) {
        return num;
    }
    upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);
    if (card.format.global) {
        return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
    } else {
        groups = card.format.exec(num);
        if (groups == null) {
            return;
        }
        groups.shift();
        groups = groups.filter(function(n) {
            return n;
        });
        return groups.join(' ');
    }
};

paymentHelpers.formatExpiry = function(expiry) {
    var mon, parts, sep, year;
    parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
    if (!parts) {
        return '';
    }
    mon = parts[1] || '';
    sep = parts[2] || '';
    year = parts[3] || '';
    if (year.length > 0) {
        sep = ' / ';
    } else if (sep === ' /') {
        mon = mon.substring(0, 1);
        sep = '';
    } else if (mon.length === 2 || sep.length > 0) {
        sep = ' / ';
    } else if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
        mon = "0" + mon;
        sep = ' / ';
    }
    return mon + sep + year;
};