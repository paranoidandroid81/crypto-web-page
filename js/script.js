// Create event handlers when page finishes load
$(document).ready(function () {
  $("#polybiusinput").change(function () {
    $("#polybius").val(psquare($("#polybiusinput").val()));
  });
});

//helper to find element in 2d Arrays
function getIndexOfK(arr, k)
{
  for (var i = 0; i < arr.length; i++) {
    var index = arr[i].indexOf(k);
    if (index > -1) {
      return [i, index];
    }
  }
}

//polybius square implementation
function psquare(d)
{
  var result;
  var ret_val = '';
  var square = [
    ['a', 'b', 'c', 'd', 'e'],
    ['f', 'g', 'h', 'i', 'k'],
    ['l', 'm', 'n', 'o', 'p'],
    ['q', 'r', 's', 't', 'u'],
    ['v', 'w', 'x', 'y', 'z']
  ];
  for (var i = 0; i < d.length; i++)
  {
    if (/\s/.test(d.charAt(i)))
    {
      continue;                 //space character, not encoded
    }
    if (d.charAt(i) == 'j')
    {
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
