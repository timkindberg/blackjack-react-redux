## To do the Workshop!

```
# If you do NOT have node 6 (check with node --version)
npm i -g n
n latest

git clone https://github.com/timkindberg/blackjack-react-redux.git
git checkout workshop
npm i
npm start

# In a second terminal
npm run test:watch
```

The working game is hosted here: https://timkindberg.github.io/blackjack-react-redux/

Now the super broken game is running at [http://localhost:3000](http://localhost:3000). The page will reload if you make edits.<br>

But for the workshop, you'll be trying to fix all the broken tests which have all been written already.

I recommend fixing the files in this order:
- actions/index.js
- reducers/game.js
- components/components.js

After you are done:
- Play the game!
- Try adding more features
- Try coding your own card game