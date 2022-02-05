const finder = (candidate, languages, matches) => {
    let counter = 0;
    for (let language of languages) {
      if (candidate.skills.find((lang) => lang === language)) {
        counter += 1;
      }
    }
    if (counter > 0 && matches.length === 0) {
      // There are no matches
      matches.push(candidate);
    } else if (
      counter > 0 &&
      matches.length !== 0 &&
      candidate.skills.length > matches[0].skills.length
    ) {
      // There are candidates that match(If other not-requested skills matter)
      // Let's assume there are many with equal amount of skills
      // Let's find the ones with less skills than the current
      // candidate and remove them recursivelly:
      // remover(candidate, matches);

      // Since other requested skills don't matter
      // clear the matches and add the new one
      clear(matches);

      // Add the current candidate to the matches list
      matches.push(candidate);
    } else if (
      counter > 0 &&
      matches.length !== 0 &&
      candidate.skills.length === matches[0].skills.length
    ) {
      // If other not-requested skills matter:
      // matches.push(candidate);
  
      // Since other requested skills don't matter
      // clear the matches and add the new one
      clear(matches);
      matches.push(candidate);
    }
  };

  const remover = (candidate, matches) => {
    console.log(candidate);
    if (candidate.skills.length > matches[matches.length - 1].skills.length) {
      matches.pop();
    }
    if (matches.length > 0) {
      remover(candidate, matches);
    }
  };
  
  const clear = (matches) => {
    matches.pop();
    if (matches.length > 0) {
      remover(matches);
    }
  };

exports.finder = finder
exports.remover = remover
exports.clear = clear