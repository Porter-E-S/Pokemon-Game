import { createContext, useState } from 'react';

const TeamContext = createContext({
        playerTeam: [],
        addToTeam: () => {},
    });
    
export default TeamContext


