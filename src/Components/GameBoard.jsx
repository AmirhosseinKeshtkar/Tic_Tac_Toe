import React, { Component } from "react";
import Block from "./Block";


const classes = {
  badgeFont: {
    fontSize: "1em",
  },
};

class Board extends Component {
  constructor(props) {
    super(props);
    let win;
  }

  state = {
    Blockss: Array(9).fill(null),
    Blocks: [
      { id: 1, value: null },
      { id: 2, value: null },
      { id: 3, value: null },
      { id: 4, value: null },
      { id: 5, value: null },
      { id: 6, value: null },
      { id: 7, value: null },
      { id: 8, value: null },
      { id: 9, value: null },
    ],
    lastId: 'X',
    winner: null,
  };

  render() {
    console.log("Rendered.");

    const current = [...this.state.Blocks];
    const winner = this.IsGameOver(current);
    if (winner === true) {
      console.log("wined")
    }
    return (
      <div className="container">
        <button
          className="btn btn-sm mt-2 mb-2 btn-info"
          onClick={this.handleResetAll}
        >
          Reset Game
        </button>
        <br />
        <div className="board-row">
          {this.renderBlock(this.state.Blocks[0])}
          {this.renderBlock(this.state.Blocks[1])}
          {this.renderBlock(this.state.Blocks[2])}
        </div>
        <div className="board-row">
          {this.renderBlock(this.state.Blocks[3])}
          {this.renderBlock(this.state.Blocks[4])}
          {this.renderBlock(this.state.Blocks[5])}
        </div>
        <div className="board-row">
          {this.renderBlock(this.state.Blocks[6])}
          {this.renderBlock(this.state.Blocks[7])}
          {this.renderBlock(this.state.Blocks[8])}
        </div>
        <div>
          <label>{winner ? 'Winner is: ' + (this.state.lastId=='X'?'O':'X' ): ''}</label>
        </div>
      </div>
    );
  }

  ChooseBlock = (id) => {
    let block = [...this.state.Blocks];
    const idx = block.findIndex((block) => {
      return block.id === id;
    });

    let lastId = this.state.lastId;
    if (block[idx].value === null) {
      block[idx].value = lastId;
      lastId = (lastId === 'X') ? 'O' : 'X';
    }
    this.setState({ block, lastId });
  };

  renderBlock(block) {
    return (
      <Block
        key={block.id}
        id={block.id}
        value={block.value}
        winner={block.winner}
        ChooseBlock={this.ChooseBlock}
      />
    );
  };

  IsGameOver(blocks) {
    let winner = this.state.winner;
    //let blocks = [...this.state.Blocks];
    for (let i = 0; i < 3; i++) {
      if (blocks[i * 3 + 1].value === blocks[i * 3].value &&
        blocks[i * 3 + 1].value === blocks[i * 3 + 2].value &&
        blocks[i * 3 + 1].value != null) {
        //winner = blocks[i * 3 + 1].value;
        console.log("wined");
        return true;
      }
      if (blocks[i + 3].value === blocks[i + 3 -3].value &&
        blocks[i + 3].value === blocks[i + 3 + 3].value &&
        blocks[i + 3].value != null) {
        //winner = blocks[i * 3].value;
        console.log("wined");
        return true;
      }
    }
    if ((blocks[0].value === blocks[4].value && blocks[4].value === blocks[8].value ||
      blocks[2].value === blocks[4].value && blocks[4].value === blocks[6].value) && blocks[4].value != null) {
      // winner = blocks[4].value;
      console.log("wined");
      return true;
    }
    return false;
    //this.setState({ winner });
    //blocks[0].value = 0;
  };

  handleResetAll = () => {
    let blocks = [...this.state.Blocks];
    for (let index = 0; index < blocks.length; index++) {
      blocks[index].value = null;
    }
    this.setState({ blocks });
  };
};

export default Board;