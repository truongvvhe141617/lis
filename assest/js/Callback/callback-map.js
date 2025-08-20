
Array.prototype.map2 = function(callback) {
    var output = [];
    var arrLength = this.length;
    for (var i = 0; i < arrLength; i++) {
        var result = callback(this[i], i, this);
        output.push(result);
    }
    return output;
}

var courses = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Ruby'
];

var newCourses = courses.map2(function(course, index) {
    return course + ' - ' + index;
});