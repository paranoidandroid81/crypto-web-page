// Create event handlers when page finishes load
$(document).ready(function () {
  $("#polybiusbutton").click(function () {
    $("#polybius").val(psquare($("#polybiusinput").val()));
  });
  $("#caesarbutton").click(function () {
    $("#caesar").val(ccipher($("#caesarinput").val()));
  });
  $("#arabbutton").click(function () {
    $("#arab").val(arab_analyze($("#arabinput").val()));
  });
  $("#homobutton").click(function () {
    $("#homo").val(homo_sub($("#homoinput").val()));
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

function arab_analyze(d)
{
  var freq = {};
  var result = '';
  for (var i = 0; i < d.length; i++)
  {
    var curr_char = d.charCodeAt(i);
    if (freq[curr_char])
    {
      freq[curr_char]++;
    } else
    {
      freq[curr_char] = 1;
    }
  }

  for (var letter in freq)
  {
    result += String.fromCharCode(letter);
    result += ': ';
    result += freq[letter];
    result += ", ";
  }
  return result;
}

function homo_sub(d)
{
  //-1 indicates homophone, must search separately
  var map = {
    a: -1, b: 'r', c: 'y',
    d: 'p', e: -1, f: 'o',
    g: 'g', h: 'r', i: -1,
    j: 'm', k: 5, l: 6,
    m: 7, n: 8, o: -1,
    p: 'b', q: 'd', r: 'e',
    s: 'f', t: 'h', u: -1,
    v: 'j', w: 'k', x: 'l',
    y: 'n', z: 'q'
  };
  var a_count, e_count, i_count, o_count, u_count;          //all vowels are homophones
  a_count = e_count = i_count = o_count = u_count = 0;        //initialize homphone counts to 0
  //arrays for homophones
  var a_alts = ['c', 1, 'u'];
  var e_alts = ['t', 2, 'v', 'z'];
  var i_alts = ['a', 3, 'w'];
  var o_alts = [9, 4, 'x'];
  var u_alts = ['i', 's'];
  //split, filter, iterate + map and join
  d.split('').filter(function(v) {
    // Does the character exist in the map?
    return map.hasOwnProperty(v.toLowerCase());
  }).map(function(v) {
    // Replace character by value
    //if -1, is homophonic
    var curr = v.toLowerCase();
    if (map[curr] == -1)
    {
      var ret_val;
      switch (curr)
      {
        case 'a':
          ret_val = a_alts[a_count];
          a_count = (a_count + 1) % a_alts.length;
          break;
        case 'e':
          ret_val = e_alts[e_count];
          e_count = (e_count + 1) % e_alts.length;
          break;
        case 'i':
          ret_val = i_alts[i_count];
          i_count = (i_count + 1) % i_alts.length;
          break;
        case 'o':
          ret_val = o_alts[o_count];
          o_count = (o_count + 1) % o_alts.length;
          break;
        case 'u':
          ret_val = u_alts[u_count];
          u_count = (u_count + 1) % u_alts.length;
          break;
      }
      return ret_val.toUpperCase();
    } else
    {
      return map[curr].toUpperCase();
    }
  }).join();
}
