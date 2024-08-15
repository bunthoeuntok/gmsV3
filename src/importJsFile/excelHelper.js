import { utils, writeFile } from 'xlsx-js-style';

export const multipleExportExcel = (params, alignVertical = 'center') => {
  const workbook = utils.book_new();
  const mergeStyle = { font: { bold: true, sz: 14 }, alignment: { horizontal: 'center', vertical: 'center' } };
  const borderStyle = {
    right: {
      style: 'thin',
      color: '000000',
    },
    left: {
      style: 'thin',
      color: '000000',
    },
    top: {
      style: 'thin',
      color: '000000',
    },
    bottom: {
      style: 'thin',
      color: '000000',
    },
  };
  const headerStyle = {
    font: { sz: 12, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '4E6CB1' } }, alignment: { horizontal: 'center', vertical: 'center' }, border: borderStyle,
  };
  let wsCol;
  let startPoint = 1;
  const mergeCell = [];
  const temWS = [
    [{ v: `${params.title}`, t: 's', s: mergeStyle }],

  ];
  const wsName = 'WorkSheet';
  params.tables.forEach((table) => {
    const header = table.columnHeaders.map((headerText) => ({ v: headerText, t: 's', s: headerStyle }));
    temWS.push(header);
    mergeCell.push({ s: { r: startPoint, c: 0 }, e: { r: startPoint, c: table.mergeFirstCell } });
    startPoint += 1;
    table.data.forEach((item) => {
      const row = item.map((value) => {
        const numberFormat = value.format ?? '';
        const data = {
          v: value.value === null ? '' : value.value,
          t: value.type === 'number' ? 'n' : 's',
          z: value.type === 'number' ? numberFormat : '',
          s: {
            alignment: {
              vertical: alignVertical, horizontal: value.align, wrapText: true,
            },
            font: { sz: 12, color: { rgb: value.color } }, fill: { fgColor: { rgb: value.bgColor } },
            border: borderStyle,
          },
        };
        return data;
      });
      temWS.push(row);
      mergeCell.push({ s: { r: startPoint, c: 0 }, e: { r: startPoint, c: table.mergeFirstCell } });
      startPoint += 1;
    });
    const objectMaxLength = [];
    for (let i = 0; i < table.data.length; i += 1) {
      const value = table.data[i];
      for (let j = 0; j < value.length; j += 1) {
        if (value[j].value === null || value[j].value === undefined) {
          value[j].value = '';
        }
        const length = value[j].value.length >= header[j].v.length ? (value[j].value.length + 10) : (header[j].v.length + 10);
        objectMaxLength[j] = objectMaxLength[j] >= length ? objectMaxLength[j] : length;
        objectMaxLength[j] = objectMaxLength[j] <= 400 ? objectMaxLength[j] : 400;
      }
    }
    wsCol = objectMaxLength.map((w) => ({ wch: w }));
  });
  const ws = utils.aoa_to_sheet(temWS);
  const maxColumnLength = Math.max(...temWS.map((item) => item.length)) - 1;
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: maxColumnLength } },
  ].concat(mergeCell);
  ws['!cols'] = wsCol;
  utils.book_append_sheet(workbook, ws, wsName);
  writeFile(workbook, `${params.fileName}.xlsx`);
};

