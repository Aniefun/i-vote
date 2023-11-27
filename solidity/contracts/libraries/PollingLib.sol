// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library PollingLib {
    struct Voter {
        bytes data;
        bool suspended;
        uint256 numOfVotes;
        uint256 unit;
    }
    struct Agent {
        bytes data;
        uint256 unit;
    }

    struct Manager {
        bytes data;
        State state;
    }

    struct Unit {
        State state;
        uint256 localGovernment;
        uint256 numOfAccreditedVoters;
    }

    struct Poll {
        bytes data;
        uint256 endAt;
        uint256 startAt;
        uint256 numOfVotes;
        uint256 unit;
        string nftUri;
    }

    struct Party {
        bytes data;
    }

    enum State {
        Abia,
        Adamawa,
        AkwaIbom,
        Anambra,
        Bauchi,
        Bayelsa,
        Benue,
        Borno,
        CrossRiver,
        Delta,
        Ebonyi,
        Edo,
        Ekiti,
        Enugu,
        Gombe,
        Imo,
        Jigawa,
        Kaduna,
        Kano,
        Katsina,
        Kebbi,
        Kogi,
        Kwara,
        Lagos,
        Nasarawa,
        Niger,
        Ogun,
        Ondo,
        Osun,
        Oyo,
        Plateau,
        Rivers,
        Sokoto,
        Taraba,
        Yobe,
        Zamfara
    }
}
