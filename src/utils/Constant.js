export const converToPrice = (number) => {
  let rp = '';
  let numberRev = number.toString().split('').reverse().join('');
  for (var i = 0; i < numberRev.length; i++)
    if (i % 3 == 0) rp += numberRev.substr(i, 3) + '.';
  return rp.split('', rp.length - 1).reverse().join('');
}

export default API = {
  localhost: 'http://192.168.0.28:8000/api/v2/'
}
