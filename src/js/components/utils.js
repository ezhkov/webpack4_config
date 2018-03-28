import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';

export const validations = {
  required: (elem) => {
    if (elem.type === 'checkbox' || elem.type === 'radio') {
      return elem.checked;
    }
    return !isEmpty(elem.value);
  },
  email: elem => isEmail(elem.value),
  minlength: elem => isLength(elem.value, { min: 6 }),
  equal: (elem) => {
    const form = closest(elem, 'form');
    const equals = Array.prototype.slice.call(form.querySelectorAll('[data-equal]'));
    const values = unique(equals.map(eq => eq.value));
    return values.length < 2;
  },
  phone: elem => elem.value.indexOf('_') === -1,
};

export function unique(arr) {
  const n = {};
  const r = [];
  arr.forEach((el) => {
    if (!n[el]) {
      n[el] = true;
      r.push(el);
    }
  });
  return r;
}

export function triggerEvent(el, evName) {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(evName, true, false);
  el.dispatchEvent(event);
}

export function closest(el, selector) {
  if (!el) return false;
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}

export function outerHeight(el) {
  let height = el.offsetHeight;
  const style = el.currentStyle || window.getComputedStyle(el);
  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}

export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export function getOffset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft, width: rect.width, height: rect.height };
}

export function deepExtend(out, ...args) {
  const _out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    const obj = args[i];

    if (!obj) {
      continue;
    }

    obj.keys.forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          _out[key] = deepExtend(_out[key], obj[key]);
        } else {
          _out[key] = obj[key];
        }
      }
    });
  }
  return _out;
}

export function prepareReportContent(response) {
  let html = response.data;
  if (response.report.report_type === 'table') {
    const tbodiesData = response.data;
    const tbodiesHTML = tbodiesData.map((tbody) => {
      const rowsData = tbody.data;
      const rowsHTML = rowsData.map(row => `<tr><td>${row.title}</td><td>${row.comment}</td></tr>`).join('');
      return `<tbody>${rowsHTML}</tbody>`;
    }).join('');
    html = `<table class="report-table">
                    <thead>
                        <tr><th>Исследуемый параметр</th><th>Результат</th></tr>
                    </thead>
                    ${tbodiesHTML}
                </table>`;
  }
  return html;
}

export const validateDictionary = {
  ru: {
    messages: {
      required: () => 'Поле обязательно для заполнения',
      email: () => 'Неверный формат Email',
      numeric: () => 'Введите только цифры',
      ext: () => 'Недопустимый формат файла',
    },
    custom: {
      patient_phone: {
        regex: () => 'Поле заполнено некорректно',
      },
      payer_phone: {
        regex: () => 'Поле заполнено некорректно',
      },
      payer_passnum: {
        regex: () => 'Поле заполнено некорректно',
      },
      document_file: {
        required: () => 'Файл не выбран',
        size: () => 'Размер файла превышает 5 Мб',
      },
    },
    dateFormat: 'YYYY-MM-DD',
  },
};

export const emptyElement = document.createElement('div');
