class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
  }

  getHead() {
    return this.head;
  }

  insertNode(index, x) {
    const newNode = new Node(x);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return this.head;
    }

    let temp = this.head;
    let i = 0;

    while (temp && i < index - 1) {
      temp = temp.next;
      i++;
    }

    if (!temp) {
      console.log(`List index out of range: ${i}`);
      return null;
    }

    newNode.next = temp.next;
    temp.next = newNode;
    return newNode;
  }

  insertAtHead(x) {
    const newNode = new Node(x);
    newNode.next = this.head;
    this.head = newNode;
    return newNode;
  }

  insertAtEnd(x) {
    const newNode = new Node(x);

    if (!this.head) {
      this.head = newNode;
      return newNode;
    }

    let temp = this.head;
    while (temp.next) temp = temp.next;

    temp.next = newNode;
    return newNode;
  }

  findNode(x) {
    let temp = this.head;
    let i = 0;

    while (temp) {
      if (temp.data === x) {
        console.log(`First occurrence of ${x} found at ${i}.`);
        return true;
      }
      temp = temp.next;
      i++;
    }
    console.log(`Value ${x} not found.`);
    return false;
  }

  deleteNode(x) {
    if (!this.head) return false;

    // Agar head match kare
    while (this.head && this.head.data.rank === x.rank && this.head.data.suit === x.suit) {
      this.head = this.head.next;
      return true;
    }

    let curr = this.head;
    while (curr && curr.next) {
      if (
        curr.next.data.rank === x.rank &&
        curr.next.data.suit === x.suit
      ) {
        curr.next = curr.next.next;
        return true;
      }
      curr = curr.next;
    }

    return false;
  }

  size() {
    let temp = this.head;
    let size = 0;
    while (temp) {
      size += 1;
      temp = temp.next;
    }
    return size;
  }

  displayList() {
    let temp = this.head;
    let output = [];
    while (temp) {
      output.push(temp.data);
      temp = temp.next;
    }
    console.log(output.join(" "));
  }

  deleteFromStart() {
    if (!this.head) {
      console.log("List is empty.");
      return false;
    }
    this.head = this.head.next;
    console.log("Deleted first node.");
    return true;
  }

  deleteFromEnd() {
    if (!this.head) {
      console.log("List is empty.");
      return false;
    }
    if (!this.head.next) {
      this.head = null;
      console.log("Deleted last node.");
      return true;
    }

    let temp = this.head;
    while (temp.next.next) temp = temp.next;

    temp.next = null;
    console.log("Deleted last node.");
    return true;
  }

  reverseList() {
    let prev = null;
    let curr = this.head;
    let next = null;

    while (curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    this.head = prev;
    console.log("List reversed.");
    return this.head;
  }

  getLastNode() {
    if (!this.head) {
      console.log("List is empty.");
      return null;
    }

    let temp = this.head;
    while (temp.next) temp = temp.next;

    console.log("Last node:", temp.data);
    return temp;
  }

  sortList(list) {
    if (!list || !list.next) return list;

    let swapped;
    do {
      swapped = false;
      let curr = list;
      while (curr.next) {
        if (curr.data > curr.next.data) {
          [curr.data, curr.next.data] = [curr.next.data, curr.data];
          swapped = true;
        }
        curr = curr.next;
      }
    } while (swapped);

    console.log("List sorted.");
    return list;
  }

  removeDuplicates(list) {
    if (!list) return null;

    let curr = list;
    while (curr) {
      let runner = curr;
      while (runner.next) {
        if (runner.next.data === curr.data) {
          runner.next = runner.next.next;
        } else {
          runner = runner.next;
        }
      }
      curr = curr.next;
    }

    console.log("Duplicates removed.");
    return list;
  }

  mergeLists(list1, list2) {
    if (!list1) return list2;
    if (!list2) return list1;

    let mergedList = null;
    let lastNodePtr = null;

    while (list1 && list2) {
      let node;
      if (list1.data < list2.data) {
        node = list1;
        list1 = list1.next;
      } else {
        node = list2;
        list2 = list2.next;
      }

      if (!mergedList) {
        mergedList = node;
        lastNodePtr = mergedList;
      } else {
        lastNodePtr.next = node;
        lastNodePtr = node;
      }
    }

    lastNodePtr.next = list1 || list2;

    console.log("Lists merged.");
    return mergedList;
  }

  intersectLists(list1, list2) {
    let result = null;
    let lastPtrRef = null;

    let ptr1 = list1;
    while (ptr1) {
      let ptr2 = list2;
      while (ptr2) {
        if (ptr1.data === ptr2.data) {
          const newNode = new Node(ptr1.data);
          if (!result) {
            result = newNode;
            lastPtrRef = result;
          } else {
            lastPtrRef.next = newNode;
            lastPtrRef = newNode;
          }
          break;
        }
        ptr2 = ptr2.next;
      }
      ptr1 = ptr1.next;
    }

    console.log("Intersection list created.");
    return result;
  }
}

class Stack {
  constructor(size) {
    if (size === undefined) {
      const input = prompt("Enter size: ");
      this.size = parseInt(input);
      while (isNaN(this.size) || this.size <= 0) {
        const valid = prompt("Enter valid size: ");
        this.size = parseInt(valid);
      }
    } else {
      this.size = size;
    }

    this.index = -1;
    this.arr = new Array(this.size);
  }

  push(value) {
    if (this.index >= this.size - 1) {
      console.log("Stack Overflow!");
      return;
    }
    this.index++;
    this.arr[this.index] = value;
  }

  display() {
    if (this.index === -1) {
      console.log("Stack is empty.");
      return;
    }

    const values = [];
    for (let i = this.index; i >= 0; i--) {
      values.push(this.arr[i]);
    }
    console.log("[" + values.join(", ") + "]");
  }

  pop() {
    if (this.index === -1) {
      console.log("Stack Underflow!");
      return null;
    }
    const value = this.arr[this.index];
    this.arr[this.index] = null;
    this.index--;
    return value;
  }

  top() {
    if (this.index === -1) {
      console.log("Stack Underflow!");
      return null;
    }
    console.log(this.arr[this.index]);
  }

  isEmpty() {
    return this.index === -1;
  }

  isFull() {
    return this.index >= this.size - 1;
  }
}

class Queue {
  constructor(size) {
    if (size === undefined) {
      const input = prompt("Enter size: ");
      this.size = parseInt(input);
      while (isNaN(this.size) || this.size <= 0) {
        const valid = prompt("Enter valid size: ");
        this.size = parseInt(valid);
      }
    } else {
      this.size = size;
    }

    this.index = -1;
    this.arr = new Array(this.size);
  }

  enqueue(value) {
    if (this.index >= this.size - 1) {
      console.log("Queue Overflow!");
      return;
    }
    this.index++;
    this.arr[this.index] = value;
  }

  dequeue() {
    if (this.index < 0) {
      console.log("Queue Underflow!");
      return null;
    }
    const val = this.arr[0];
    for (let i = 0; i < this.index; i++) {
      this.arr[i] = this.arr[i + 1];
    }
    this.arr[this.index] = null;
    this.index--;
    return val;
  }

  peek() {
    if (this.index < 0) {
      console.log("Queue Underflow!");
      return null;
    }
    return this.arr[0];
  }

  front() {
    if (this.index < 0) {
      console.log("Queue Underflow!");
      return;
    }
    console.log(this.arr[0]);
  }

  back() {
    if (this.index < 0) {
      console.log("Queue Underflow!");
      return;
    }
    console.log(this.arr[this.index]);
  }

  isEmpty() {
    return this.index === -1;
  }

  isFull() {
    return this.index >= this.size - 1;
  }
}

class Card {
  constructor(suit, rank, faceUp = false) {
    this.suit = suit;
    this.rank = rank;
    this.faceUp = faceUp;

    // Create the DOM element
    this.element = document.createElement('div');
    this.element.classList.add(faceUp ? 'face-up' : 'face-down');
    this.element.dataset.suit = suit;
    this.element.dataset.rank = rank;
    this.element.style.position = 'absolute';
    this.element.style.left = '0';
    this.element.style.width = '7.5vw';
    this.element.style.height = '18vh';
    this.element.style.backgroundSize = 'cover';
    this.element.style.backgroundPosition = 'center';
    this.element.cardInstance = this; // link DOM element back to instance


    if (faceUp) {
      this.element.style.backgroundImage = `url('cards/${rank}${suit}.png')`;
    } else {
      this.element.style.backgroundImage = `url('Me.jpg')`;
    }

    this.element.classList.add('StockCards');
  }

  flipUp() {
    this.faceUp = true;
    this.element.classList.remove('face-down');
    this.element.classList.add('face-up');
    this.element.style.backgroundImage = `url('cards/${this.rank}${this.suit}.png')`;
    this.element.style.backgroundSize = 'cover';
    this.element.style.backgroundPosition = 'center';
  }

  flipDown() {
    this.faceUp = false;
    this.element.classList.remove('face-up');
    this.element.classList.add('face-down');
    this.element.style.backgroundImage = `url('Me.jpg')`;
    this.element.style.backgroundSize = 'cover';
    this.element.style.backgroundPosition = 'center';
  }
}

class StockCard extends Card {
  constructor(suit, rank, faceUp = false) {
    super(suit, rank, faceUp);
    this.element.classList.add('StockCards');
  }
}

// --- DATA STRUCTURES INTEGRATION ---
const cardPositions = new Map(); // HashMap: card => {pile, faceUp}

// 1️⃣ Create deck using List
const deckList = new List();
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
for (let s of suits) {
  for (let r of ranks) {
    const card = new StockCard(s, r, false);
    deckList.insertAtEnd(card); // linked list storage
    cardPositions.set(card, { pile: null, pileIndex: 0 });
  }
}
// Convert linked list to array
let deckArray = [];
let temp = deckList.getHead();
while (temp) {
  deckArray.push(temp.data);
  temp = temp.next;
}

function hasReachableAce(deck) {
  return deck.slice(0, 21).some(c => c.rank === 'A');
}

function hasPlayableKing(deck) {
  // at least one King in first 21 cards
  return deck.slice(0, 21).some(c => c.rank === 'K');
}

function tooManyKingsClumped(deck) {
  const first10 = deck.slice(0, 10).filter(c => c.rank === 'K').length;
  return first10 >= 3;
}

function hasColorAlternation(deck) {
  // check for at least one descending alternating pair in first 15 cards
  const rankOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  for (let i = 0; i < 14; i++) {
    const a = deck[i], b = deck[i + 1];
    if (!a || !b) continue;
    const colorAlt = getColor(a.suit) !== getColor(b.suit);
    const descending = rankOrder.indexOf(a.rank) === rankOrder.indexOf(b.rank) + 1;
    if (colorAlt && descending) return true;
  }
  return false;
}

function lowCardsVisible(deck) {
  // ensure at least 2 of A,2,3 appear early
  const early = deck.slice(0, 24);
  const lows = early.filter(c => ['A', '2', '3'].includes(c.rank));
  return lows.length >= 2;
}

function avoidLockedSequences(deck) {
  // no 3 consecutive same-color cards in a row early
  const early = deck.slice(0, 21);
  let sameColorCount = 1;
  for (let i = 1; i < early.length; i++) {
    if (getColor(early[i].suit) === getColor(early[i - 1].suit)) {
      sameColorCount++;
      if (sameColorCount >= 3) return false;
    } else sameColorCount = 1;
  }
  return true;
}

function wastePlayable(deck) {
  // first 3 waste draws should have something playable (heuristic)
  const waste = deck.slice(24, 27); // after tableau
  return waste.some(c => ['A', '2', 'K'].includes(c.rank));
}

// --- Combined Validation ---
function isValidDeck(deck) {
  return (
    hasReachableAce(deck) &&
    hasPlayableKing(deck) &&
    hasColorAlternation(deck) &&
    lowCardsVisible(deck) &&
    avoidLockedSequences(deck) &&
    wastePlayable(deck)
  );
}

// --- Shuffle with validation loop ---
const maxAttempts = 1000;
function shuffleDeck(deckArray) {
  let valid = false;
  let attempts = 0;
  do {
    attempts++;
    for (let i = deckArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckArray[i], deckArray[j]] = [deckArray[j], deckArray[i]];
    }

    valid = isValidDeck(deckArray);
  } while (!valid && attempts < maxAttempts);
  
  return deckArray;
}

deckArray = shuffleDeck(deckArray);

// --- Stockpile Queue ---
const tempQueue = new Queue(52);
const stockQueue = new Queue(24);
deckArray.forEach(card => tempQueue.enqueue(card));

// --- Tableau Stacks & Linked Lists ---
const tableauStacks = [];
const tableauLists = [];
const allSlots = document.querySelectorAll('.slot');
const stockSlot = allSlots[0];
const tableauSlots = Array.from(allSlots).slice(-7);

// --- Waste Pile ---
const supplementaryList = new List();


for (let i = 0; i < 7; i++) {
  tableauStacks[i] = new Stack(20); // max 20 cards per column
  tableauLists[i] = new List();
}

// --- Deal cards ---
for (let i = 0; i < 7; i++) {
  for (let j = 0; j <= i; j++) {
    const card = tempQueue.dequeue();
    tableauStacks[i].push(card);
    tableauLists[i].insertAtEnd(card);
    cardPositions.get(card).pile = tableauLists[i];
    cardPositions.get(card).pileIndex = i;
    const slot = tableauSlots[i];
    slot.appendChild(card.element);
    card.element.style.top = `${j * 25}px`;
    if (i === j)
      card.flipUp()
  }
}

// Remaining go to stock pile 
while (!tempQueue.isEmpty()) {
  const card = tempQueue.dequeue();
  stockQueue.enqueue(card);
  stockSlot.appendChild(card.element);
  card.element.style.position = 'absolute';
  card.element.style.left = '0';
  card.element.style.top = '0';
}

// --- Drag & Drop Logic ---
// 1. Let Cards drag
function getDraggedStack(card) {
  const originalSlot = card.parentElement;
  const allCards = Array.from(originalSlot.querySelectorAll('.StockCards'));
  const draggedIndex = allCards.indexOf(card);
  if (originalSlot.classList.contains('slot-supplementary-slot')) {
    // Waste pile: only visible cards
    return [card];
  } else {
    // Tableau: all face-up cards starting from dragged card
    return allCards.slice(draggedIndex).filter(c => c.classList.contains('face-up'));
  }
}

// 2. Move dragged stack with mouse
function moveStack(draggedStack, pageX, pageY) {
  const gap = 25;
  const rect = draggedStack[0].getBoundingClientRect();
  draggedStack.forEach((c, i) => {
    c.style.position = 'absolute';
    c.style.zIndex = 1000 + i;
    c.style.left = pageX - rect.width / 2 + 'px';
    c.style.top = pageY - rect.height / 2 + i * gap + 'px';
    document.body.appendChild(c);
  });
}

// 3. Handle mouse release
function releaseStack(draggedStack, originalSlot) {
  const placed = placeStack(draggedStack, originalSlot);

  // Flip next card in original slot
  if (placed && placed !== originalSlot) {

    updateDataStructures(originalSlot, placed, draggedStack);
    const remaining = Array.from(originalSlot.querySelectorAll('.StockCards'));
    const next = remaining[remaining.length - 1];
    if (next && next.classList.contains('face-down')) {
      next.classList.remove('face-down');
      next.cardInstance.faceUp = true;
      next.classList.add('face-up');
      next.style.backgroundImage = `url('cards/${next.dataset.rank}${next.dataset.suit}.png')`;
      next.style.backgroundSize = 'cover';
      next.style.backgroundPosition = 'center';
      onFlipCard();  // Score 
    }
  }
}

// 4. Places Dragging Stack:
function placeStack(stack, originalSlot) {
  const slots = document.querySelectorAll('.slot, .slot-supplementary-slot, .upper-slot');
  const main = stack[0];
  let placed = null;
  const rect1 = main.getBoundingClientRect();

  slots.forEach(slot => {
    const existing = Array.from(slot.querySelectorAll('.StockCards'));
    const lastCard = existing[existing.length - 1] || slot;
    const rect2 = lastCard.getBoundingClientRect();

    const isIntersecting =
      rect1.right > rect2.left &&
      rect1.left < rect2.right &&
      rect1.bottom > rect2.top &&
      rect1.top < rect2.bottom;

    if (!isIntersecting) return;

    if (canPlaceOnSlot(main, slot)) {
      appendStackToSlot(stack, slot);
      placed = slot;

      // Record move details including face states
      const stateSnapshot = stack.map(card => ({
        card: card.cardInstance,
        wasFaceUp: card.classList.contains('face-up')
      }));

      // Record if original slot's last card was flipped
      const remaining = Array.from(originalSlot.querySelectorAll('.StockCards'));
      const next = remaining[remaining.length - 1];
      const nextWasFlipped = next && next.classList.contains('face-down');

      moveHistory.push({
        stack: stack,
        from: originalSlot,
        to: slot,
        stateSnapshot,
        next,
        nextWasFlipped
      });

      // Supplementary slot; Update supplementaryList
      if (originalSlot.classList.contains('slot-supplementary-slot')) {
        supplementaryList.deleteNode({
          rank: main.dataset.rank,
          suit: main.dataset.suit
        });
        if (!stockQueue.isEmpty()) {
          const card = stockQueue.dequeue();
          originalSlot.appendChild(card.element);
          card.element.classList.remove('face-down');
          card.element.classList.add('face-up');
          card.element.style.backgroundImage = `url('cards/${card.rank}${card.suit}.png')`;
          card.element.style.backgroundSize = 'cover';
          card.element.style.backgroundPosition = 'center';
          card.faceUp = true;

          supplementaryList.insertAtEnd({
            rank: card.rank,
            suit: card.suit
          });
          updateSupplementarySlotDisplay(originalSlot);
        }
      }
    }
  }
  );
  if (!placed && originalSlot) returnStackToOriginalSlot(stack, originalSlot);
  return placed || originalSlot;
}

// 4 (1). Check if main card can be placed on a slot
function canPlaceOnSlot(main, slot) {
  const existing = Array.from(slot.querySelectorAll('.StockCards'));
  const lastCard = existing[existing.length - 1];

  // Upper Slots (foundation)
  if (slot.classList.contains('upper-slot')) {
    if (!lastCard) return main.dataset.rank === 'A' && main.dataset.suit === slot.innerText; // only Ace
    const mainRank = getRankValue(main.dataset.rank);
    const lastRank = getRankValue(lastCard.dataset.rank);
    return main.dataset.suit === lastCard.dataset.suit && mainRank === lastRank + 1;

  }

  // Lower Slots (tableau)
  if (slot.classList.contains('slot')) {
    if (!lastCard) return main.dataset.rank === 'K'; // only King
    const mainRank = getRankValue(main.dataset.rank);
    const lastRank = getRankValue(lastCard.dataset.rank);
    const mainColor = getColor(main.dataset.suit);
    const lastColor = getColor(lastCard.dataset.suit);
    return mainRank === lastRank - 1 && mainColor !== lastColor;
  }

  return false;
}

// 4 (2) Append stack to slot with proper positioning
function appendStackToSlot(stack, slot) {
  const existing = Array.from(slot.querySelectorAll('.StockCards'));
  let baseTop;

  if (slot.classList.contains('upper-slot')) {
    baseTop = 0; // foundation pile me no gap
    onMoveToFoundation();
  } else if (slot.classList.contains('slot-supplementary-slot')) {
    baseTop = 0; // waste pile ke liye bhi 0
  } else {
    baseTop = existing.length * 25; // tableau me stacked offset
  }

  stack.forEach((c, i) => {
    slot.appendChild(c);
    c.style.position = 'absolute';
    c.style.left = '0';
    c.style.top = (baseTop + i * 25) + 'px';
    c.style.zIndex = existing.length + i + 1;
    c.style.display = 'block';
  });
}


// Data Structures updation after a valid move
function updateDataStructures(fromSlot, toSlot, stack) {
  const fromIndex = tableauSlots.indexOf(fromSlot);
  const toIndex = tableauSlots.indexOf(toSlot);
  if (toSlot.classList.contains('upper-slot')) {
    cardPositions.set(stack[0].cardInstance, {
      pile: null,
      pileIndex: toIndex,
    });
    // console.log(cardPositions);
    return;
  }
  if (fromIndex !== -1) {
    stack.forEach(card => tableauLists[fromIndex].deleteNode(card.cardInstance));
    stack.forEach(() => tableauStacks[fromIndex].pop());
  }
  if (toIndex !== -1) {
    let cardIndex = 0;
    stack.forEach(card => {
      tableauLists[toIndex].insertAtEnd(card.cardInstance);
      tableauStacks[toIndex].push(card.cardInstance);

      // ✅ Update card position after move
      cardPositions.set(card.cardInstance, {
        pile: tableauLists[toIndex],
        pileIndex: toIndex,
      });
    });
  }
  console.log(cardPositions);
}
// Event listener  
document.querySelectorAll('.slot, .slot-supplementary-slot, .upper-slot').forEach(slot => {
  slot.addEventListener('mousedown', e => {
    const card = e.target.closest('.StockCards');
    if (!card || !card.cardInstance || !card.cardInstance.faceUp) return;

    const originalSlot = card.parentElement;
    const draggedStack = getDraggedStack(card);

    moveStack(draggedStack, e.pageX, e.pageY);

    function onMove(ev) { moveStack(draggedStack, ev.pageX, ev.pageY); }
    document.addEventListener('mousemove', onMove);

    document.addEventListener('mouseup', function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      releaseStack(draggedStack, originalSlot);

      checkWinCondition();
    }, { once: true });
  });
});
// console.log(cardPositions);

function updateSupplementarySlotDisplay(slot) {

  // Decide Order via Supplementary List
  const orderedCards = [];
  let temp = supplementaryList.getHead();
  while (temp) {
    const { rank, suit } = temp.data;
    const card = Array.from(slot.querySelectorAll('.StockCards'))
      .find(c => c.dataset.rank === rank && c.dataset.suit === suit);
    if (card) orderedCards.push(card);
    temp = temp.next;
  }

  const total = orderedCards.length;
  const visibleCount = 3;
  const start = Math.max(0, total - visibleCount);

  orderedCards.forEach((card, i) => {
    card.style.position = 'absolute';
    card.style.top = '0';
    card.style.left = i >= start ? `${(i - start) * 20}px` : '0';
    card.style.zIndex = i + 1;
    card.style.display = 'block';
  });
}

// 3. Return stack to original slot if move invalid
function returnStackToOriginalSlot(stack, originalSlot) {
  if (originalSlot.classList.contains('slot-supplementary-slot')) {

    // Append stack first
    stack.forEach(card => originalSlot.appendChild(card));
    updateSupplementarySlotDisplay(originalSlot);
  }
  else {
    appendStackToSlot(stack, originalSlot);
  }
}

const moveHistory = [];  // For Undo Functionality (In Future)

function recycleStock() {
  const supplementarySlot = document.querySelector('.slot-supplementary-slot');
  const stockSlot = document.querySelector('.slot'); // ensure defined

  if (!stockQueue.isEmpty()) {
    const drawCount = 3;
    for (let i = 0; i < drawCount; i++) {
      const card = stockQueue.dequeue();
      supplementarySlot.appendChild(card.element);
      card.flipUp();

      // Update Supplementary list
      supplementaryList.insertAtEnd({
        rank: card.rank,
        suit: card.suit
      });

      updateSupplementarySlotDisplay(supplementarySlot);
    }
    return;
  }

  // If stockQueue empty, recycle supplementary cards
  const supplementaryCards = Array.from(supplementarySlot.querySelectorAll('.StockCards'));
  if (supplementaryCards.length > 0) {
    supplementaryCards.forEach((domCard, i) => {
      stockSlot.appendChild(domCard);
      const cardObj = domCard.cardInstance; // reverse-link from DOM
      stockQueue.enqueue(cardObj);
      cardObj.flipDown();
      domCard.style.position = 'absolute';
      domCard.style.left = '0';
      domCard.style.top = '0';
      domCard.style.zIndex = i + 1;
    });
    supplementaryList.head = null;
    onRecycleStock();
  }
}

document.querySelector('.slot').addEventListener('click', () => {
  recycleStock();
});

function getRankValue(rank) {
  const order = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13
  };
  return order[rank];
}

function getColor(suit) {
  return (suit === '♥' || suit === '♦') ? 'red' : 'black';
}



document.querySelector("#New-Game").addEventListener("click", () => {
  location.reload();
});

// document.querySelector("#navbar button:nth-child(1)")?.addEventListener("click", undoMove);
document.querySelector("#Hint")?.removeEventListener("click", showHint);
document.querySelector("#Hint")?.addEventListener("click", showHint);

// In-Sha-Allah in future this option will also be available

// function undoMove() {
//   if (moveHistory.length === 0) {
//     console.log("No moves to undo.");
//     return;
//   }

//   const lastMove = moveHistory.pop();
//   const { stack, from, to, stateSnapshot, next, nextWasFlipped } = lastMove;

//   // Remove stack from destination slot
//   stateSnapshot.forEach(s => {
//     if (s.wasFaceUp) s.card.flipUp();
//     else s.card.flipDown();
//   });

//   // Return stack to original slot
//   if (from.classList.contains('slot-supplementary-slot')) {
//     stack.forEach(card => from.appendChild(card));
//     updateSupplementarySlotDisplay(from);
//   } else {
//     appendStackToSlot(stack, from);
//   }

//   // ♻️ Restore each card’s previous face state
//   stateSnapshot.forEach(s => {
//     if (s.wasFaceUp) s.card.flipUp();
//     else s.card.flipDown();
//   });

//   // 🔁 Restore previous face-down card (if it was flipped automatically)
//   if (next && nextWasFlipped) {
//     next.flipDown();
//   }

//   console.log("Undo successful (face states restored).");
// }


// Advanced hint system implementing the hierarchy you specified.


function highlight(cardEl, targetEl, duration = 675) {
  cardEl.style.boxShadow = '0 0 18px 6px rgba(255,215,0,0.95)';
  if (targetEl) targetEl.style.border = '3px solid rgba(255,215,0,0.95)';
  setTimeout(() => {
    cardEl.style.boxShadow = '';
    if (targetEl) targetEl.style.border = '';
  }, duration);
}

// Utility: check if a candidate move is simply the reverse of last move
function isReverseOfLastMove(candidate) {
  if (!moveHistory || moveHistory.length === 0) return false;
  const last = moveHistory[moveHistory.length - 1];
  // last: { stack, from, to, ... } ; candidate: { cardEl, fromEl, toEl }
  try {
    return last.from === candidate.toEl && last.to === candidate.fromEl;
  } catch (e) {
    return false;
  }
}

// Helper: returns true if moving `cardEl` from `fromEl` to `toEl` will reveal a face-down card in fromEl
function willRevealHidden(fromEl, cardEl) {
  // Only relevant for tableau source
  if (!fromEl || !fromEl.classList.contains('slot')) return false;
  const all = Array.from(fromEl.querySelectorAll('.SlotCards, .StockCards'));
  // find index of cardEl in all
  const idx = all.indexOf(cardEl);
  if (idx <= 0) return false;
  const newTop = all[idx - 1];
  return newTop && newTop.classList.contains('face-down');
}

// Helper: find the smallest-rank candidate (for foundations preference)
function pickLowestRank(candidates) {
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => getRankValue(a.cardEl.dataset.rank) - getRankValue(b.cardEl.dataset.rank));
  return candidates[0];
}

function showHint() {
  const tableauSlots = Array.from(document.querySelectorAll('.slot')).slice(-7);
  const supplementarySlot = document.querySelector('.slot-supplementary-slot');
  const foundationSlots = Array.from(document.querySelectorAll('.upper-slot'));

  const candidates = {
    toFoundation: [],         // { cardEl, fromEl, toEl, reason }
    revealHidden: [],         // { cardEl, fromEl, toEl, reveals }
    tableauToTableau: [],     // { cardEl, fromEl, toEl, reveals }
    wasteToTableau: [],       // { cardEl, fromEl, toEl }
    wasteToFoundation: [],    // { cardEl, fromEl, toEl }
    kingToEmpty: []           // { cardEl, fromEl, toEl }
  };

  // 0️⃣ convenience: get all face-up stockcards in waste and all tableau face-up cards (including sequences)
  const wasteVisible = supplementarySlot ? Array.from(supplementarySlot.querySelectorAll('.StockCards.face-up')).slice(-3) : [];

  function addKingToEmptyCandidate(cardEl, fromEl, dest) {
    const existing = Array.from(dest.querySelectorAll('.StockCards.face-up, .StockCards.face-down'));
    if (!existing[existing.length - 1] && cardEl.dataset.rank === 'K' && !cardEl.closest('.slot')) {
      candidates.kingToEmpty.push({ cardEl, fromEl, toEl: dest });
    }
  }
  // 1️⃣ Check tableau cards (every face-up card, not only top)
  tableauSlots.forEach(slot => {
    const faceUpCards = Array.from(slot.querySelectorAll('.StockCards.face-up'));
    if (faceUpCards.length === 0) return;

    faceUpCards.forEach(cardEl => {
      if (faceUpCards[faceUpCards.length - 1] === cardEl) {
        for (const f of foundationSlots) {
          if (canPlaceOnSlot(cardEl, f)) {
            candidates.toFoundation.push({ cardEl, fromEl: slot, toEl: f, reason: 'tableau->foundation' });
          }
        }
      }
      // b) Can this card/sequence go to another tableau?
      tableauSlots.forEach(dest => {
        if (dest === slot || dest === stockSlot) return;

        const existing = Array.from(dest.querySelectorAll('.StockCards.face-up, .StockCards.face-down'));
        const lastCard = existing[existing.length - 1];

        // King into empty tableau
        addKingToEmptyCandidate(cardEl, slot, dest);

        // normal tableau placement
        if (canPlaceOnSlot(cardEl, dest)) {
          const allCardsInSlot = Array.from(slot.querySelectorAll('.StockCards.face-up, .StockCards.face-down'));
          const index = allCardsInSlot.indexOf(cardEl);
          const upperCard = index > 0 ? allCardsInSlot[index - 1] : null;
          if (upperCard && lastCard && upperCard.dataset.rank === lastCard.dataset.rank) return;

          const reveals = willRevealHidden(slot, cardEl);
          const entry = { cardEl, fromEl: slot, toEl: dest, reveals };
          if (reveals) candidates.revealHidden.push(entry);
          else candidates.tableauToTableau.push(entry);
        }
      });
    });
  });

  // 2️⃣ Check waste cards (waste can go to tableau or foundation)
  if (wasteVisible.length > 0) {
    wasteVisible.forEach(cardEl => {
      // waste -> foundation
      for (const f of foundationSlots) {
        if (canPlaceOnSlot(cardEl, f)) {
          candidates.wasteToFoundation.push({ cardEl, fromEl: supplementarySlot, toEl: f });
        }
      }

      // waste -> tableau
      tableauSlots.forEach(dest => {
        if (canPlaceOnSlot(cardEl, dest)) {
          candidates.wasteToTableau.push({ cardEl, fromEl: supplementarySlot, toEl: dest, reveals: false });
        }
        addKingToEmptyCandidate(cardEl, supplementarySlot, dest);
      });
    });
  }

  // Candidate selection following priority list

  // Priority 1: move to foundation from tableau OR waste
  if (candidates.toFoundation.length > 0 || candidates.wasteToFoundation.length > 0) {
    // prefer tableau foundation moves over waste-to-foundation
    if (candidates.toFoundation.length > 0) {
      // prefer lowest-rank among these
      const pick = pickLowestRank(candidates.toFoundation);
      if (!isReverseOfLastMove({ fromEl: pick.fromEl, toEl: pick.toEl })) {
        highlight(pick.cardEl, pick.toEl);
        return;
      }
    }
    // else waste->foundation
    if (candidates.wasteToFoundation.length > 0) {
      const pick = candidates.wasteToFoundation[0]; // single top waste
      if (!isReverseOfLastMove({ fromEl: pick.fromEl, toEl: pick.toEl })) {
        highlight(pick.cardEl, pick.toEl);
        return;
      }
    }
  }

  // Priority 2: reveal hidden cards by making a tableau move that reveals
  if (candidates.revealHidden.length > 0) {
    // prefer leftmost source column (tableauSlots order) and moves that also enable foundation soon
    candidates.revealHidden.sort((a, b) => {
      const aFromIndex = tableauSlots.indexOf(a.fromEl);
      const bFromIndex = tableauSlots.indexOf(b.fromEl);
      if (aFromIndex !== bFromIndex) return aFromIndex - bFromIndex;
      // prefer the one that has lower card rank (makes foundation more probable)
      return getRankValue(a.cardEl.dataset.rank) - getRankValue(b.cardEl.dataset.rank);
    });
    const pick = candidates.revealHidden.find(c => !isReverseOfLastMove({ fromEl: c.fromEl, toEl: c.toEl })) || candidates.revealHidden[0];
    highlight(pick.cardEl, pick.toEl);
    return;
  }

  // Priority 3: move sequences between tableaus (prefer those that reveal)
  if (candidates.tableauToTableau.length > 0) {
    // prefer moves that make progress (lowest rank moved, leftmost from)
    candidates.tableauToTableau.sort((a, b) => {
      const ai = tableauSlots.indexOf(a.fromEl);
      const bi = tableauSlots.indexOf(b.fromEl);
      if (ai !== bi) return ai - bi;
      return getRankValue(a.cardEl.dataset.rank) - getRankValue(b.cardEl.dataset.rank);
    });
    const pick = candidates.tableauToTableau.find(c => !isReverseOfLastMove({ fromEl: c.fromEl, toEl: c.toEl })) || candidates.tableauToTableau[0];
    highlight(pick.cardEl, pick.toEl);
    return;
  }

  // Priority 4: move waste -> tableau (prefer that which uncovers tableau sooner)
  if (candidates.wasteToTableau.length > 0) {
    // prefer target that uncovers a hidden card in that target's column? Here prefer leftmost dest
    candidates.wasteToTableau.sort((a, b) => {
      const ai = tableauSlots.indexOf(a.toEl);
      const bi = tableauSlots.indexOf(b.toEl);
      return ai - bi;
    });
    const pick = candidates.wasteToTableau.find(c => !isReverseOfLastMove({ fromEl: c.fromEl, toEl: c.toEl })) || candidates.wasteToTableau[0];
    highlight(pick.cardEl, pick.toEl);
    return;
  }

  // Priority 5 handled earlier (wasteToFoundation), so skip

  // Priority 6: King to empty tableau (prefer tableau kings over waste kings, leftmost dest)
  if (candidates.kingToEmpty.length > 0) {
    // prefer card from tableau over waste
    candidates.kingToEmpty.sort((a, b) => {
      const aFromTableau = a.fromEl && a.fromEl.classList.contains('slot') ? 0 : 1;
      const bFromTableau = b.fromEl && b.fromEl.classList.contains('slot') ? 0 : 1;
      if (aFromTableau !== bFromTableau) return aFromTableau - bFromTableau;
      const di = tableauSlots.indexOf(a.toEl);
      const dj = tableauSlots.indexOf(b.toEl);
      return di - dj;
    });
    const pick = candidates.kingToEmpty.find(c => !isReverseOfLastMove({ fromEl: c.fromEl, toEl: c.toEl })) || candidates.kingToEmpty[0];
    highlight(pick.cardEl, pick.toEl);
    return;
  }

  // Priority 7: Draw from stock if available
  const stockCards = Array.from(stockSlot.querySelectorAll('.StockCards'));
  const wasteCards = supplementarySlot ? Array.from(supplementarySlot.querySelectorAll('.StockCards')) : [];
  if ((candidates.toFoundation.length === 0 && candidates.revealHidden.length === 0 && candidates.tableauToTableau.length === 0)
    && stockCards.length > 0) {
    // highlight stock pile top card stack visually
    const top = stockCards[stockCards.length - 1];
    highlight(top, null);
    return;
  }

  // Priority 8: Recycle waste into stock if stock empty but waste exists
  if (stockCards.length === 0 && wasteCards.length > 0) {
    // highlight the waste pile area
    const topWaste = wasteCards[wasteCards.length - 1];
    highlight(topWaste, stockSlot);
    return;
  }

}

// --- Timer ---
let startTime;
let timerInterval;

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);

  startTime = Date.now();
  const timeEl = document.getElementById('Time');
  if (!timeEl) return console.error("No element with id 'Time' found");

  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    timeEl.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, 1000);
}
document.addEventListener('DOMContentLoaded', () => {
  startTimer(); // ya button event listener attach karo yahan
});
function stopTimer() {
  clearInterval(timerInterval);
}


// --- Score ---
let score = 0;

function updateScore(points) {
  score += points;
  if (score < 0) score = 0; // score kabhi negative na ho
  document.getElementById('ScoreDiv').innerText = `Score: ${score}`;
}

function updateScoreAuto(scoreCount){
  for (let i = 1; i <= scoreCount; i++) {
    updateScore(10);
  }
}

function onMoveToFoundation() {
  updateScore(10);
}

function onFlipCard() {
  updateScore(5);
}

function onRecycleStock() {
  updateScore(-15);
}

function onUndo() {
  updateScore(-1);
}

// --- Start timer on new game ---
document.getElementById('New-Game').addEventListener('click', () => {
  startTimer();
  score = 0;
  updateScore(0);
});

function checkWinCondition() {
  // Condition: stock is empty and supplementary list is empty
  if (stockQueue.isEmpty() && supplementaryList.size() === 0) {
    let allFaceUp = true;

    // Check if all tableau cards are face-up
    let scoreCount = 0;
    for (let i = 0; i < 7 && allFaceUp; i++) {
      let temp = tableauLists[i].getHead();
      while (temp) {
        scoreCount++;
        if (!temp.data.faceUp) {
          allFaceUp = false;
          break;
        }
        temp = temp.next;
      }
    }

    // If all tableau cards are face-Up show Solve Button
    if (allFaceUp) {
      const supplementarySlot = document.querySelector('.slot-supplementary-slot');

      // Avoid creating multiple Solve buttons
      if (!document.querySelector('.solve-button')) {
        const solveBtn = document.createElement('button');
        solveBtn.className = 'solve-button';
        solveBtn.textContent = 'Solve 🔮';
        solveBtn.style.padding = '8px 16px';
        solveBtn.style.fontSize = '16px';
        solveBtn.style.fontWeight = 'bold';
        solveBtn.style.cursor = 'pointer';
        solveBtn.style.borderRadius = '8px';
        solveBtn.style.border = '2px solid gold';
        solveBtn.style.background = 'linear-gradient(135deg, #ffea00, #ffcc00)';
        solveBtn.style.boxShadow = '0 0 12px rgba(255,215,0,0.8)';
        supplementarySlot.appendChild(solveBtn);

        // Add click event
        solveBtn.addEventListener('click', () => {
          autoCompleteGame(scoreCount);
          solveBtn.remove(); // remove button after use
        });
      }
    }
  }
}

// Helper: Move all cards to foundations and end game
function autoCompleteGame(scoreCount) {
  const foundationSlots = document.querySelectorAll('.upper-slot');
  const tableauSlots = Array.from(document.querySelectorAll('.slot')).slice(-7);
  tableauSlots.forEach(slot => (slot.innerHTML = ''));

  foundationSlots.forEach((slot, i) => {
    slot.innerHTML = '';
    slot.innerText = suits[i];
    for (let r of ranks) {
      const card = new StockCard(suits[i], r, true);
      slot.appendChild(card.element);
    }
  });

  updateScoreAuto(scoreCount);
  showWinOverlay();
}

function showWinOverlay() {
  stopTimer();
  const timeEl = document.getElementById('Time');
  const scoreEl = document.getElementById('ScoreDiv');

  const time = timeEl ? timeEl.innerText : '00:00';
  const score = scoreEl ? scoreEl.innerText : 'Score: 100';

  const winOverlay = document.createElement('div');
  winOverlay.classList.add('win-overlay');
  winOverlay.innerHTML = `
    <div class="win-popup">
      <h2>🎉 Congratulations!</h2>
      <p>You solved the game!</p>
      <p>Time: <b>${time}</b></p>
      <p><b>${score}</b></p>
      <button onclick="window.location.reload()">Play Again</button>
    </div>
  `; document.body.appendChild(winOverlay);

  // Optional fade-out animation (enable later)
  // setTimeout(() => {
  //   winOverlay.classList.add('fade-out');
  //   setTimeout(() => winOverlay.remove(), 500);
  // }, 3000);
}
