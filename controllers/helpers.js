const finder = (candidate, languages, matches) => {
  // We'll make sure there is at least one match
  let counter = 0;
  for (let language of languages) {
    if (candidate.skills.find((lang) => lang === language)) {
      // If a match is found, increase the counter by one
      counter += 1;
    }
  }
  candidate.counter = counter;

  // Found at least one match and candidates data is empty
  if (counter > 0 && matches.length === 0) {
    matches.push(candidate); // Simply push the candidate 
  } else if ( // Found at least one match and candidates data is not empty
    counter > 0 &&
    matches.length !== 0 &&
    candidate.counter > matches[0].counter // Aaaand the currently stored candidate has less skills
  ) {
    // Since other non requested skills don't matter
    // clear the matches and add the new one
    matches.splice(0,matches.length);

    // Add the current candidate to the matches list
    matches.push(candidate);
  } else if ( // Found at least one match and candidates data is not empty
    counter > 0 &&
    matches.length !== 0 &&
    candidate.counter === matches[0].counter // Buuut the currently stored candidate has the same amount of skills
  ) {
    // Since other non requested skills don't matter
    // clear the matches and add the new one
    matches.splice(0,matches.length);
    matches.push(candidate);
  }
  };

exports.finder = finder