const Election = artifacts.require("Election");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Election', ([voter1, voter2, voter3]) => {
    
    let election;

    before(async () => {
        election = await Election.deployed();
    });

    describe('Part 1: Deployment', async () => {

        it('deploys successfully', async () => {
            const address = await election.address;
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

    });

    describe('Part 2: Create 3 candidates successfully', async () => {

        it('creates Candidate 1 correctly', async () => {
            const candidate1 = await election.candidates(1);
            assert.equal(candidate1[0].toNumber(), 1)
            assert.equal(candidate1[1], 'Donald Trump')
            assert.equal(candidate1[2].toNumber(), 0)
        })

        it('creates Candidate 2 correctly', async () => {
            const candidate2 = await election.candidates(2);
            assert.equal(candidate2[0].toNumber(), 2)
            assert.equal(candidate2[1], 'Joe Biden')
            assert.equal(candidate2[2].toNumber(), 0)
        })

        it('creates Candidate 3 correctly', async () => {
            const candidate3 = await election.candidates(3);
            assert.equal(candidate3[0].toNumber(), 3)
            assert.equal(candidate3[1], 'Kim Namjoon')
            assert.equal(candidate3[2].toNumber(), 0)
        })

    });

    describe('Part 3: Check that all voters have not voted yet', async () => {

        it('voter 1 has not voted', async () => {
            const voter1hasVotedOrNot = await election.voters(voter1)
            assert.equal(voter1hasVotedOrNot, false)
        })

        it('voter 2 has not voted', async () => {
            const voter2hasVotedOrNot = await election.voters(voter2)
            assert.equal(voter2hasVotedOrNot, false)
        })

        it('voter 3 has not voted', async () => {
            const voter3hasVotedOrNot = await election.voters(voter3)
            assert.equal(voter3hasVotedOrNot, false)
        })

    })

    describe('Part 4: Check that voter 2 has voted for RM successfully', async () => {

        it('Prevent voting by an invalid id', async () => {
            // There are only 3 candidates, so voting by id "4" should be rejected
            await election.vote(4, {from: voter2}).should.be.rejected

            const voter2hasVotedOrNot = await election.voters(voter2)
            assert.equal(voter2hasVotedOrNot, false)

        })

        it('ONLY voter 2 has voted', async () => {
            await election.vote(3, {from: voter2})

            const voter1hasVotedOrNot = await election.voters(voter1)
            assert.equal(voter1hasVotedOrNot, false)

            const voter2hasVotedOrNot = await election.voters(voter2)
            assert.equal(voter2hasVotedOrNot, true)

            const voter3hasVotedOrNot = await election.voters(voter3)
            assert.equal(voter3hasVotedOrNot, false)

        })

        it('RM now has 1 vote', async () => {
            const candidate3 = await election.candidates(3);
            assert.equal(candidate3[0].toNumber(), 3)
            assert.equal(candidate3[1], 'Kim Namjoon')
            assert.equal(candidate3[2].toNumber(), 1)
        })

    })

    describe('Part 5: Check that a voter cannot vote twice', async () => {
        
        it('Prevent voter 2 from voting AGAIN', async () => {
            // In Part 4, voter 2 has already voted. The value of voters[voter2] will continue to be "true"
            const voter2hasVotedOrNot = await election.voters(voter2)
            assert.equal(voter2hasVotedOrNot, true)

            // Attempting to vote AGAIN, so it should be rejected
            await election.vote(3, {from: voter2}).should.be.rejected

        })

        it('RM STILL has 1 vote only', async () => {
            const candidate3 = await election.candidates(3);
            assert.equal(candidate3[0].toNumber(), 3)
            assert.equal(candidate3[1], 'Kim Namjoon')
            assert.equal(candidate3[2].toNumber(), 1)
        })

    })

});

// truffle test ./test/TestElection.js