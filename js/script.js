// Create event handlers when page finishes load
$(document).ready(function () {
  $("#polybiusbutton").click(function () {
    $("#polybius").val(psquare($("#polybiusinput").val()));
  });
  $("#caesarbutton").click(function () {
    $("#caesar").val(ccipher($("#caesarinput").val()));
  });
});

function getIndexOfK(arr, k) {
  for (var i = 0; i < arr.length; i++) {
    var index = arr[i].indexOf(k);
    if (index > -1) {
      return [i, index];
    }
  }
}

//helper to get act as modulus operator
function mod(x, range) {
  if (x < range) return x;
  if (x >= range) return Math.abs(range - x);
}

//polybius square implementation
function psquare(d) {
  var result;
  var ret_val = '';
  var square = [
    ['a', 'b', 'c', 'd', 'e'],
    ['f', 'g', 'h', 'i', 'k'],
    ['l', 'm', 'n', 'o', 'p'],
    ['q', 'r', 's', 't', 'u'],
    ['v', 'w', 'x', 'y', 'z']
  ];
  for (var i = 0; i < d.length; i++) {
    if (/\s/.test(d.charAt(i))) {
      continue;                 //space character, not encoded
    }
    if (d.charAt(i) == 'j') {
      //i/j index to same space, need to replace j with i for array
      result = getIndexOfK(square, 'i');
    } else {
      result = getIndexOfK(square, d.charAt(i));
    }
    result[0]++;            //index of square begins at 1, not 0
    result[1]++;
    ret_val += (result[0].toString());
    ret_val += (result[1].toString());
  }
  return ret_val;
}

function ccipher(d) {
  var encMsg = '';
  var shift = 3;                  //shift alpha 3 letters over
  for (var i = 0; i < d.length; i++) {
    var code = d.charCodeAt(i);
    if ((code >= 65) && (code <= 90)) {
      //uppercase
      encMsg += String.fromCharCode((mod((code - 65 + shift), 26) + 65));
    } else if ((code >= 97) && (code <= 122)) {
      encMsg += String.fromCharCode((mod((code - 97 + shift), 26) + 97));
    } else {
      encMsg += String.fromCharCode(code);
    }
  }
  return encMsg;
}
