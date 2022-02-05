const HttpError = require('../models/http-error');
const helpers = require('./helpers')

// candidates data
const candidates = [
    {
      id: "1",
      name: "DevOne",
      skills: ["node"]
    }
  ];

const searchCandidatesV2 = (req, res, next) => {
    const skillName = req.params.skill;
    const candidate = candidates.find((cnd) => {
      return cnd.id === skillName;
    });
    if(!candidate){
      // const error = new Error('No results were found')
      // error.code = 404;
      return next(new HttpError('No results were found', 404));
      // Also: throw error -- If there is no middleware or return statement afterwards,
      // throw already cancels next function execution
      // return res.status(404).json({message: 'No results were found'});
    }
      res.status(200).json(candidate);
  }

// Search Candidates with query strings
// Ref: https://www.youtube.com/watch?v=QTAYRmMsVCI
const searchCandidates = (req, res, next) => {
    const skills = req.query.skills;
    if(!skills){
        return next(new HttpError('Data must not be empty', 400)); 
    }
    const languages = skills.split(",");

    // Check if there is data
    if(candidates.length === 0){
        return next(new HttpError('There are no candidates', 404)); 
    }

    // Initialize the matches
    const matches = [];

    // Start searching
    for (let candidate of candidates) {
        helpers.finder(candidate, languages, matches);
    }

    // check if there are no matches
    if(matches.length === 0){
        return next(new HttpError('No results match the search criteria', 404)); 
    }

    // console.log(skills);
    res.status(200).json(matches[0]);
    
  }

const createCandidate = (req, res, next) => {
    const {id, name, skills} = req.body;
    if(id.length === 0 || name.length === 0 || skills.length === 0){
        return next(new HttpError('Data must not be empty', 400)); 
    }
    const createdCandidate = {
        id, // we used abbreviated method as variables from req.body have the same name
        name,
        skills,
    };
    candidates.push(createdCandidate); // unshift() to add it as the first element
    res.status(201).json(createdCandidate);
}

// function searchCandidates(req, res, next) {...}
// cosnt searchCandidates = function (req, res, next) {...}

exports.searchCandidates = searchCandidates;
exports.createCandidate = createCandidate