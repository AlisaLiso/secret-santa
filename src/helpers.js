/// Randomize copy of passed array
export function randomizer(users) {
  const usersCopy = users.slice();
  let remainingElements = usersCopy.length;
  let index = 0;
  let temp;

  while (remainingElements) {
    // Choose index randomly dependinng on how many
    // unchanged elements left
    index = Math.floor(Math.random() * remainingElements--);

    // Save current element
    temp = usersCopy[remainingElements];

    // Swap current element with randomly selected element
    usersCopy[remainingElements] = usersCopy[index];
    usersCopy[index] = temp;
  }

  return usersCopy;
}

/// Pair people with saving oeder
export function secretSantaPair(params) {
  let users = params.slice();
  let recipients = users.slice();

  for (var i = 0; i < users.length; i++) {
    const sender = users[i];

    let recipientIndex = Math.floor(Math.random() * recipients.length);

    // Recipient can't be sender
    while (recipients[recipientIndex] === sender) {
      recipientIndex = Math.floor(Math.random() * recipients.length);
    }

    var recipient = recipients.splice(recipientIndex, 1)[0];

    sender.receiver = recipient;
  }

  return users;
}

/// Pair people without saving order
export function secretSantaShuffeled(params) {
  // Brute force because initial position
  // of the users changes
  const randomizedUsers = randomizer(params);

  for (let i = 0; i < randomizedUsers.length; i++) {
    // if current user is a last one in array
    // add first user as a receiver
    if (i === randomizedUsers.length - 1) {
      randomizedUsers[randomizedUsers.length - 1].receiver = randomizedUsers[0]
    } else {
      randomizedUsers[i].receiver = randomizedUsers[i + 1]
    }
  }

  return randomizedUsers;
}
