function containsKeyword(keywordString, keyword) {
    const lowerCaseKeywordString = keywordString.toLowerCase();
    const lowerCaseKeyword = keyword.toLowerCase();

   
    const regex = new RegExp("\\b" + lowerCaseKeyword + "\\b");

    
    return regex.test(lowerCaseKeywordString);
}



module.exports = {
    containsKeyword
}