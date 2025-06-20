document.addEventListener('DOMContentLoaded', () => {
    // Select elements to display the card content
    const currentCard = document.getElementById('current-card');
    const cardConcept = document.getElementById('card-concept');         // Concept on front
    const cardPrompt = document.getElementById('card-prompt');           // Prompt on front
    const cardConceptBack = document.getElementById('card-concept-back'); // Concept on back
    const cardActions = document.getElementById('card-actions');         // Actions on back

    const newCardBtn = document.getElementById('new-card-btn');
    const shareCardBtn = document.getElementById('share-card-btn');      // Changed from copyCardBtn
    const copyMessage = document.getElementById('copy-message');         // Repurposed for email feedback

    // Select the content containers for the front and back of the card to manage animations
    const cardFrontContentDiv = currentCard.querySelector('.card-front-content');
    const cardFrontTitle = currentCard.querySelector('.card-title'); // Concept title on front
    const cardFrontLabel = currentCard.querySelector('.card-label');
    const cardFrontText = currentCard.querySelector('#card-prompt');

    // Elements for card flipping
    const cardInner = currentCard.querySelector('.card-inner');
    const cardFrontDiv = currentCard.querySelector('.card-front'); // Reference to the actual front face div
    const cardBackDiv = currentCard.querySelector('.card-back');   // Reference to the actual back face div
    const flipToBackButton = document.getElementById('flip-to-back-button');
    const flipToFrontButton = document.getElementById('flip-to-front-button');

    // !!! IMPORTANT: Your CSV data converted to a JavaScript array is now incorporated here !!!
    // Each object in the array should have keys matching your original CSV headers,
    // which are "Concept", "Journal Prompt", "Action 1", "Action 2", etc.
    // For "Suggested Actions", I'm combining "Action 1" and "Action 2" from your data.
    const journalData = [
        {
            "Concept": "Abundance",
            "Journal Prompt": "Reflect on three non-material things you have in abundance (love, laughter, learning, etc.). How do these enrich your life?",
            "Action 1": "Dedicate 5 minutes to listing everything you're grateful for, big or small, until you fill a page.",
            "Action 2": "Share a surplus of something (time, knowledge, a kind word) with someone who could benefit.",
            "Imagery Idea1": "A cornucopia overflowing with colorful, glowing fruits and vegetables",
            "Imagery Idea2": "a joyful rain of sparkling coins and hearts."
        },
        {
        "Concept": "Wonder",
        "Journal Prompt": "When was the last time you felt true wonder? What were you looking at, hearing, or touching?",
        "Action 1": "Take a 20-minute 'artist date' walk. Collect 3 tiny objects that catch your eye. Arrange them like a tiny altar.",
        "Action 2": "Google a random topic (e.g., 'bioluminescent fungi') and let yourself tumble into curiosity."
    },
    {
        "Concept": "Disruption",
        "Journal Prompt": "What rules (yours or others') are you ready to break, even just for today?",
        "Action 1": "Eat dessert before lunch. Take a different route home.",
        "Action 2": "Rearrange a space in your home in a way that feels slightly rebellious."
    },
    {
        "Concept": "Stillness",
        "Journal Prompt": "What comes up for you in silence? What do you avoid by staying busy?",
        "Action 1": "Set a timer for 10 minutes. Sit still. Breathe.",
        "Action 2": "Lay on the floor and do absolutely nothing. Let yourself be horizontal on purpose."
    },
    {
        "Concept": "Delight",
        "Journal Prompt": "List 5 small things that give you a secret thrill. How could you give one to yourself today?",
        "Action 1": "Buy a sticker. Put it somewhere serious.",
        "Action 2": "Watch a kid's cartoon you used to love. Sing along to the theme song."
    },
    {
        "Concept": "Flow",
        "Journal Prompt": "What activity makes you lose track of time? When did you last do it?",
        "Action 1": "Set a timer for 30 minutes and do a creative activity without judgment.",
        "Action 2": "Cook without a recipe using only what’s in your fridge and pantry."
    },
    {
        "Concept": "Play",
        "Journal Prompt": "When were you last truly playful? What did it feel like in your body?",
        "Action 1": "Make up a game with only objects around you.",
        "Action 2": "Talk in a funny voice to your pet or a plant for 3 minutes."
    },
    {
        "Concept": "Nostalgia",
        "Journal Prompt": "What part of your younger self do you miss? What would they want to do today?",
        "Action 1": "Write a letter to your 10-year-old self.",
        "Action 2": "Listen to a song you loved in middle school and dance like you're there again."
    },
    {
        "Concept": "Permission",
        "Journal Prompt": "What have you been waiting for permission to do or feel? Can you give it to yourself today?",
        "Action 1": "Write yourself a permission slip and sign it.",
        "Action 2": "Say 'no' to something minor today. Notice how it feels."
    },
    {
        "Concept": "Curiosity",
        "Journal Prompt": "What are you curious about that you haven't explored? Why not?",
        "Action 1": "Pick up a nonfiction book or article on a random topic and read for 10 minutes.",
        "Action 2": "Ask someone you trust a question you've always wanted to ask."
    },
    {
        "Concept": "Imagination",
        "Journal Prompt": "If anything were possible, what would your day look like?",
        "Action 1": "Write a 5-sentence story where you're the hero of a magical world.",
        "Action 2": "Doodle a dream you had—or make one up from scratch."
    },
        {
            "Concept": "Acceptance",
            "Journal Prompt": "How has accepting a challenging situation or feeling in the past surprisingly brought you peace or clarity?",
            "Action 1": "When a difficult emotion arises, acknowledge it with kindness: \"Hello, sadness. I see you.\" without judgment.",
            "Action 2": "Choose one minor imperfection about yourself or a situation you're resisting. Gently affirm, \"I accept this as it is right now.",
            "Imagery Idea1": "A person calmly holding a tangled ball of colorful yarn",
            "Imagery Idea2": "a river flowing smoothly around a large, unmovable rock."
        },
        {
            "Concept": "Accountability",
            "Journal Prompt": "When has taking personal responsibility for an outcome, even a difficult one, led to a positive learning experience?",
            "Action 1": "Reflect on a commitment you made and joyfully follow through on it today, no matter how small.",
            "Action 2": "When something doesn't go as planned, take a moment to identify your part in it with curiosity, not blame.",
            "Imagery Idea1": "A playful, glowing balance scale with \"Me\" and \"Them\" on each side, perfectly level",
            "Imagery Idea2": "a person holding up a brightly colored promise ribbon."
        },
        {
            "Concept": "Appreciation",
            "Journal Prompt": "What three unexpected things are you most grateful for today? How do they add joy to your life?",
            "Action 1": "Express genuine gratitude to three different people today, specifying what you appreciate about them.",
            "Action 2": "Take a photo of something beautiful or simple you appreciate, and revisit it later for a boost.",
            "Imagery Idea1": "A shower of golden stars falling onto open hands",
            "Imagery Idea2": "a vibrant garden blooming with \"thank you\" flowers."
        },
        {
            "Concept": "Authenticity",
            "Journal Prompt": "Describe a time you showed up as your true self, and it brought you a sense of freedom or deeper connection.",
            "Action 1": "Identify one small way you can express a genuine thought or feeling today, even if it's slightly unconventional.",
            "Action 2": "Engage in an activity where you feel completely uninhibited and true to yourself, just for the joy of it.",
            "Imagery Idea1": "A person peeling back layers of a vibrant onion to reveal a glowing core",
            "Imagery Idea2": "a chameleon confidently displaying its true colors."
        },
        {
            "Concept": "Awareness",
            "Journal Prompt": "What subtle beauty or moment of peace did you notice today because you were truly present?",
            "Action 1": "Practice a 5-minute \"sensory check-in\": notice 5 things you can see, 4 you can hear, 3 you can feel, 2 you can smell, 1 you can taste.",
            "Action 2": "Before reacting to a situation, pause and notice your immediate thoughts and feelings with gentle curiosity.",
            "Imagery Idea1": "A flashlight beam illuminating a hidden, colorful path",
            "Imagery Idea2": "an eye wide open, reflecting a complex, beautiful world."
        },
        {
            "Concept": "Belonging",
            "Journal Prompt": "When have you felt truly connected and celebrated for who you are? How can you create more of that feeling?",
            "Action 1": "Reach out to someone you haven't connected with in a while to share a positive memory or laugh.",
            "Action 2": "Join a new group or community (online or in person) that sparks joy or aligns with a positive interest.",
            "Imagery Idea1": "A whimsical patchwork quilt with diverse, colorful fabrics stitched together harmoniously",
            "Imagery Idea2": "a circle of unique, brightly colored creatures holding hands."
        },
        {
            "Concept": "Boundaries",
            "Journal Prompt": "When has setting a clear boundary brought you peace, more energy, or a stronger relationship?",
            "Action 1": "Practice saying \"no\" politely but firmly to one request that would drain your energy or time, with kindness.",
            "Action 2": "Clearly communicate a boundary that will allow you to protect your positive energy or time for well-being.",
            "Imagery Idea1": "A whimsical, colorful fence with an open gate",
            "Imagery Idea2": "a person confidently holding a glowing shield of personal space."
        },
        {
            "Concept": "Candor",
            "Journal Prompt": "When has speaking your truth, with kindness, surprisingly strengthened a relationship or brought clarity?",
            "Action 1": "Practice expressing a direct, honest thought today in a low-stakes situation, focusing on clear and kind wording.",
            "Action 2": "Have a conversation you've been avoiding with genuine intent for clarity and mutual understanding.",
            "Imagery Idea1": "A clear, shimmering bell ringing a pure tone",
            "Imagery Idea2": "a vibrant speech bubble with a transparent, honest message."
        },
        {
            "Concept": "Challenge",
            "Journal Prompt": "Reflect on a past challenge that, in hindsight, led to significant growth or a positive outcome.",
            "Action 1": "Reframe a perceived \"problem\" into a \"challenge\" or \"exciting opportunity\" to explore new solutions.",
            "Action 2": "Seek out a new, joyful challenge that pushes you slightly outside your comfort zone, like learning a new dance move or trying a new recipe.",
            "Imagery Idea1": "A winding, colorful path leading to a glowing mountain peak",
            "Imagery Idea2": "a playful obstacle course with vibrant, encouraging signs."
        },
        {
            "Concept": "Clarity",
            "Journal Prompt": "What decision, once made with clarity, brought you a sense of calm and relief?",
            "Action 1": "Dedicate 10 minutes to silent reflection, focusing on a specific decision to gain joyful clarity.",
            "Action 2": "Write down the top three things that bring you the most joy or meaning in your life right now.",
            "Imagery Idea1": "A perfectly clear, sparkling crystal ball revealing a vibrant future",
            "Imagery Idea2": "a lighthouse beam cutting through colorful fog."
        },
        {
            "Concept": "Collaboration",
            "Journal Prompt": "Describe a time you truly enjoyed working with others, creating something greater than you could alone.",
            "Action 1": "Offer to joyfully help a colleague or friend with a task, sharing your energy and support.",
            "Action 2": "Initiate a brainstorming session with diverse individuals, focusing on creating vibrant new possibilities together.",
            "Imagery Idea1": "A vibrant, interlocking gears forming a colorful machine",
            "Imagery Idea2": "many small, diverse hands building a tall, shimmering tower together."
        },
        {
            "Concept": "Commitment",
            "Journal Prompt": "What's one commitment you've joyfully upheld that has brought significant positive results in your life?",
            "Action 1": "Choose one small, attainable commitment to your well-being (e.g., drink a glass of water) and celebrate sticking to it.",
            "Action 2": "Clearly communicate a positive commitment you're making to someone else, like \"I commit to supporting you.",
            "Imagery Idea1": "A strong, colorful rope tied around a glowing goal",
            "Imagery Idea2": "a person with a determined, joyful expression crossing a finish line."
        },
        {
            "Concept": "Connection",
            "Journal Prompt": "When do you feel most connected to others, and how does that enrich your life?",
            "Action 1": "Reach out to someone you haven't connected with in a while and genuinely inquire about their joy or well-being.",
            "Action 2": "Spend quality time with a loved one, focusing on active listening and shared laughter.",
            "Imagery Idea1": "A vibrant web of glowing threads connecting diverse figures",
            "Imagery Idea2": "two hands meeting, creating a burst of colorful light."
        },
        {
            "Concept": "Courage",
            "Journal Prompt": "When have you taken a brave step, despite fear, that led to a fulfilling experience?",
            "Action 1": "Identify one small fear you can face today (e.g., trying a new food) and take a step towards it with a smile.",
            "Action 2": "Speak up for yourself or someone else with kindness and conviction, even if it feels a little uncomfortable.",
            "Imagery Idea1": "A tiny, brave bird launching itself from a giant, colorful mushroom",
            "Imagery Idea2": "a person in mismatched socks fearlessly stepping onto a rainbow tightrope."
        },
        {
            "Concept": "Curiosity",
            "Journal Prompt": "What unexpected discovery or learning experience brought you delight because you were curious?",
            "Action 1": "Spend 15 minutes observing something mundane (e.g., a plant, a cloud) and ask as many joyful \"what if\" and \"how\" questions as you can.",
            "Action 2": "Initiate a conversation with someone whose perspective differs from yours, focusing on understanding their viewpoint with genuine interest.",
            "Imagery Idea1": "A playful fox peeking out from behind a question mark made of glowing vines",
            "Imagery Idea2": "a magnifying glass revealing a hidden, vibrant miniature world."
        },
        {
            "Concept": "Daring",
            "Journal Prompt": "When have you taken a bold risk that paid off beautifully, leading to growth or joy?",
            "Action 1": "Identify one small, joyful step you can take today towards a dream you've been putting off.",
            "Action 2": "Do something daring just for fun – like trying a new challenging activity or wearing something wonderfully wild.",
            "Imagery Idea1": "A tiny, brave bird launching itself from a giant, colorful mushroom",
            "Imagery Idea2": "a person in mismatched socks fearlessly stepping onto a rainbow tightrope."
        },
        {
            "Concept": "Discernment",
            "Journal Prompt": "When has your intuition or thoughtful consideration led you to a positive and clear decision?",
            "Action 1": "Before making a decision, list pros and cons, then reflect on your gut feeling with trust and positive intention.",
            "Action 2": "Practice observing a situation from multiple positive perspectives before forming an opinion.",
            "Imagery Idea1": "A set of sparkling, balanced scales weighing colorful truths",
            "Imagery Idea2": "an owl with wise, glowing eyes seeing through illusions."
        },
        {
            "Concept": "Ease",
            "Journal Prompt": "In what areas of your life can you invite more joyful ease instead of striving or struggling?",
            "Action 1": "Identify one task you've been overcomplicating and find a simpler, more effortless way to approach it.",
            "Action 2": "Practice \"doing nothing\" for 10 minutes, allowing yourself to simply be with a feeling of lightness.",
            "Imagery Idea1": "A flowing, shimmering river carrying a colorful boat effortlessly",
            "Imagery Idea2": "a person gracefully dancing through a complex pattern."
        },
        {
            "Concept": "Empathy",
            "Journal Prompt": "When has truly understanding another person's feelings deepened a connection or brought about a positive solution?",
            "Action 1": "Listen actively to someone today, trying to understand their perspective with an open heart and genuine compassion.",
            "Action 2": "Offer a kind word or gesture of understanding to someone who might be having a difficult day.",
            "Imagery Idea1": "A bridge of rainbow colors connecting two different islands",
            "Imagery Idea2": "two hearts glowing and mirroring each other."
        },
        {
            "Concept": "Empowerment",
            "Journal Prompt": "When have you felt truly powerful and capable, and what positive impact did that have on you or others?",
            "Action 1": "Identify one new skill you want to develop and joyfully take the first step towards learning it.",
            "Action 2": "Offer genuine encouragement and belief to someone who is struggling, helping them feel empowered.",
            "Imagery Idea1": "A person's shadow transforming into a vibrant, larger-than-life superhero",
            "Imagery Idea2": "a hand holding a glowing orb of inner strength."
        },
        {
            "Concept": "Energy",
            "Journal Prompt": "What activities or interactions fill you with vibrant, positive energy? How can you invite more of them?",
            "Action 1": "Schedule a \"power up\" hour where you engage in an activity that genuinely energizes your body and spirit.",
            "Action 2": "Notice where your energy is being drained and gently redirect your focus to what uplifts you.",
            "Imagery Idea1": "A swirling vortex of vibrant colors radiating outward",
            "Imagery Idea2": "a playful battery icon charging with sparkling light."
        },
        {
            "Concept": "Enquiry",
            "Journal Prompt": "What's a long-held belief you have about yourself or the world that, when questioned, opened up new positive possibilities?",
            "Action 1": "Practice asking open-ended questions in your conversations, focusing on \"how\" and \"what\" to inspire deeper, joyful thought.",
            "Action 2": "Choose a challenge you're facing and brainstorm 10 different, even unconventional, ways to approach it with playful curiosity.",
            "Imagery Idea1": "A detective owl with a giant question mark magnifying glass",
            "Imagery Idea2": "a tangled ball of string unraveling into distinct, colorful threads."
        },
        {
            "Concept": "Evolution",
            "Journal Prompt": "How have you positively changed or grown in the past year, becoming more authentically you?",
            "Action 1": "Reflect on one belief or habit you've joyfully outgrown that no longer served your well-being.",
            "Action 2": "Identify one small area where you're willing to embrace positive change and try a new, uplifting approach.",
            "Imagery Idea1": "A caterpillar transforming into a vibrant butterfly",
            "Imagery Idea2": "a spiral staircase leading upwards into a starry sky."
        },
        {
            "Concept": "eXpansion",
            "Journal Prompt": "Where in your life do you feel a wonderful sense of growth or breaking through limitations?",
            "Action 1": "Engage in an activity that playfully pushes you slightly outside your comfort zone, embracing the newness.",
            "Action 2": "Brainstorm five wild, joyful possibilities for a current desire or dream, letting your imagination soar.",
            "Imagery Idea1": "A small, colorful sprout breaking through a cracked, dull wall",
            "Imagery Idea2": "a person stretching their arms wide, touching distant, glowing stars."
        },
        {
            "Concept": "Flow",
            "Journal Prompt": "When do you experience moments of \"flow\" where time seems to disappear and you're deeply immersed in joyful creation?",
            "Action 1": "Identify one activity that consistently puts you in a state of positive flow and schedule dedicated time for it this week.",
            "Action 2": "Engage in a creative activity without judgment or expectation of outcome, simply enjoying the process.",
            "Imagery Idea1": "A person effortlessly surfing on a wave of vibrant colors",
            "Imagery Idea2": "a winding river of light moving through a landscape."
        },
        {
            "Concept": "Forgiveness",
            "Journal Prompt": "How has releasing resentment or self-blame brought you a sense of lightness and peace?",
            "Action 1": "Write a letter of forgiveness (you don't have to send it) to someone or yourself, focusing on letting go for your own well-being.",
            "Action 2": "Practice self-forgiveness for a mistake you've made, offering yourself the same kindness you'd offer a friend.",
            "Imagery Idea1": "A broken, colorful chain gently dissolving into shimmering dust",
            "Imagery Idea2": "a bright, open hand releasing a heavy, dark stone."
        },
        {
            "Concept": "Freedom",
            "Journal Prompt": "In what areas of your life do you feel wonderfully liberated and expansive?",
            "Action 1": "Identify one commitment or obligation you can joyfully release that no longer serves your highest good.",
            "Action 2": "Spend time in nature, allowing your mind to wander freely and find a sense of inner spaciousness.",
            "Imagery Idea1": "A colorful hot air balloon drifting above a tangled, broken fence",
            "Imagery Idea2": "a person shedding a heavy, gray cloak to reveal brightly colored clothes underneath."
        },
        {
            "Concept": "Generosity",
            "Journal Prompt": "Recall a time you gave freely without expectation of return, and it filled you with joy.",
            "Action 1": "Offer genuine praise or a heartfelt compliment to three different people today.",
            "Action 2": "Donate your time, skills, or resources to a cause you genuinely care about, feeling the joy of contribution.",
            "Imagery Idea1": "A vibrant watering can sprinkling golden glitter onto a flourishing garden",
            "Imagery Idea2": "a hand offering a rainbow-colored gift box that continually replenishes."
        },
        {
            "Concept": "Gratitude",
            "Journal Prompt": "What are three unexpected and joyful things you are profoundly grateful for right now?",
            "Action 1": "Keep a gratitude journal for a week, noting three new things each day, focusing on the simple delights.",
            "Action 2": "Express heartfelt gratitude to someone you interact with today, making their day brighter.",
            "Imagery Idea1": "A basket overflowing with glowing, heart-shaped items",
            "Imagery Idea2": "a person looking up at a sky full of sparkling \"thank you\" messages."
        },
        {
            "Concept": "Honesty",
            "Journal Prompt": "What is one truth you've spoken, with kindness, that ultimately led to greater connection or peace?",
            "Action 1": "Practice radical honesty for a day, expressing your true thoughts and feelings (with kindness) in your interactions.",
            "Action 2": "Have a difficult but honest conversation you've been avoiding, with the positive intention of fostering understanding.",
            "Imagery Idea1": "A clear, sparkling glass prism revealing a hidden spectrum of colors",
            "Imagery Idea2": "a person gently opening a locked, glowing box."
        },
        {
            "Concept": "Humility",
            "Journal Prompt": "When has admitting \"I don't know\" or \"I was wrong\" opened a door to new, positive learning or connection?",
            "Action 1": "Actively listen to feedback with an open heart, seeing it as an opportunity for joyful growth.",
            "Action 2": "Share a small mistake you've made with gentle self-compassion, and reflect on what you learned from it.",
            "Imagery Idea1": "A giant, colorful tree bowing gently to a tiny, glowing mushroom",
            "Imagery Idea2": "a wise figure listening intently to a small voice."
        },
        {
            "Concept": "Imagination",
            "Journal Prompt": "What joyful dreams or delightful possibilities have you been allowing yourself to explore lately?",
            "Action 1": "Spend 15 minutes daydreaming without any agenda or judgment, simply for the pleasure of it.",
            "Action 2": "Brainstorm five wildly creative and impractical ideas for a current desire or challenge, just for fun.",
            "Imagery Idea1": "A whimsical cloud shaped like a thought bubble, filled with colorful, fantastical creatures",
            "Imagery Idea2": "a child with wide eyes conjuring a vibrant world."
        },
        {
            "Concept": "Inquiry",
            "Journal Prompt": "What \"beautiful question\" could you ask yourself today that would unlock new, joyful possibilities?",
            "Action 1": "Practice asking open-ended questions in your conversations, focusing on \"how\" and \"what\" to inspire deeper, joyful thought.",
            "Action 2": "When faced with a strong opinion, ask \"What else could be true?\" with genuine curiosity and openness.",
            "Imagery Idea1": "A magnifying glass revealing intricate, glowing details",
            "Imagery Idea2": "a wise-looking creature holding a parchment with a single, profound question."
        },
        {
            "Concept": "Insight",
            "Journal Prompt": "When have you had a sudden \"aha!\" moment that brought clarity, peace, or a new positive direction?",
            "Action 1": "Dedicate time to quiet reflection to allow new, joyful insights to emerge from within.",
            "Action 2": "Journal about a persistent question, focusing on uncovering hidden truths or luminous patterns.",
            "Imagery Idea1": "A lightbulb made of colorful thoughts illuminating a dark room",
            "Imagery Idea2": "a shimmering key unlocking a previously hidden door."
        },
        {
            "Concept": "Inspiration",
            "Journal Prompt": "What or who fills you with positive energy and a desire to create or grow? How can you invite more of it?",
            "Action 1": "Seek out a piece of art, music, or literature that deeply inspires and uplifts your spirit.",
            "Action 2": "Share something that inspires you with someone else, spreading the positive energy.",
            "Imagery Idea1": "A vibrant, colorful muse whispering ideas into an ear",
            "Imagery Idea2": "a sky filled with dazzling, exploding stars of creativity."
        },
        {
            "Concept": "Integrity",
            "Journal Prompt": "Describe a time when your actions were fully aligned with your values, and it felt wonderfully right and peaceful.",
            "Action 1": "Identify one small action you can take today to align your actions more closely with a core value that brings you joy.",
            "Action 2": "Review your commitments and joyfully uphold those that serve your integrity, releasing those that don't with grace.",
            "Imagery Idea1": "A towering, colorful tree with roots firmly planted in glowing values",
            "Imagery Idea2": "a compass pointing precisely towards a shimmering North Star."
        },
        {
            "Concept": "Intention",
            "Journal Prompt": "What is one clear, positive intention you want to set for your day or a specific interaction?",
            "Action 1": "Before starting a task or conversation, take a moment to set a clear, uplifting intention.",
            "Action 2": "Reflect on whether your actions are joyfully aligning with your stated intentions.",
            "Imagery Idea1": "An arrow made of colorful light flying towards a glowing target",
            "Imagery Idea2": "a person planting a vibrant seed of purpose."
        },
        {
            "Concept": "Interconnection",
            "Journal Prompt": "How do you see yourself beautifully connected to others, your community, or the natural world?",
            "Action 1": "Spend time in nature, observing the intricate and joyful interconnectedness of ecosystems.",
            "Action 2": "Reflect on how your actions, even small ones, might ripple outwards to positively affect others.",
            "Imagery Idea1": "A vibrant, intricate web of glowing threads connecting everything",
            "Imagery Idea2": "a diverse group of hands holding onto a single, shimmering heart."
        },
        {
            "Concept": "Joy",
            "Journal Prompt": "What activities or moments consistently bring you a sense of pure, unadulterated joy? How often do you engage in them?",
            "Action 1": "Schedule a dedicated block of time this week for an activity that brings you pure joy, with no other agenda.",
            "Action 2": "Take a moment to savor a simple pleasure, like a warm drink, a favorite song, or a beautiful view.",
            "Imagery Idea1": "A dancing explosion of confetti and glitter",
            "Imagery Idea2": "a child with wide, happy eyes surrounded by floating bubbles of laughter."
        },
        {
            "Concept": "Kindness",
            "Journal Prompt": "When was the last time you went out of your way to be kind, and it brightened both your day and someone else's?",
            "Action 1": "Perform a random act of kindness for someone you don't know today, simply for the joy of giving.",
            "Action 2": "Practice self-kindness by acknowledging a mistake without harsh self-criticism, and offering yourself compassion.",
            "Imagery Idea1": "A gentle, oversized hand offering a brightly colored, soft blanket to a small, shivering creature",
            "Imagery Idea2": "a garden blooming with heart-shaped flowers."
        },
        {
            "Concept": "Learning",
            "Journal Prompt": "What's a topic or skill you've always wanted to learn that brings you excitement? What's your first joyful step?",
            "Action 1": "Dedicate 15 minutes to actively learning something new that sparks your interest or joy.",
            "Action 2": "Ask a mentor or expert in a field you're interested in for a brief conversation or advice, embracing the learning journey.",
            "Imagery Idea1": "A stack of whimsical, colorful books with glowing pages",
            "Imagery Idea2": "a lightbulb above an open brain that's filled with swirling, colorful ideas."
        },
        {
            "Concept": "Listening",
            "Journal Prompt": "How well do you truly listen to others, not just waiting to speak, but to truly understand and connect?",
            "Action 1": "Practice active listening today, focusing solely on understanding the other person's positive intentions or feelings without forming your reply.",
            "Action 2": "Listen to a piece of joyful music or the sounds of nature with full, undivided attention, finding peace in the moment.",
            "Imagery Idea1": "A large, colorful ear collecting shimmering sound waves",
            "Imagery Idea2": "two people facing each other with vibrant, open hearts."
        },
        {
            "Concept": "Love",
            "Journal Prompt": "What does love mean to you, beyond romantic notions? How can you cultivate more of it in your life?",
            "Action 1": "Express love and appreciation to someone in your life in a way that is meaningful to them, spreading warmth.",
            "Action 2": "Practice self-love by engaging in an activity that genuinely nourishes your soul and brings you inner peace.",
            "Imagery Idea1": "An overflowing, glowing heart radiating warmth and colorful light",
            "Imagery Idea2": "a gentle, soft embrace creating a rainbow aura."
        },
        {
            "Concept": "Mindfulness",
            "Journal Prompt": "When do you feel most present and aware in your daily life, and how does it bring you a sense of calm or joy?",
            "Action 1": "Practice a 5-minute meditation or breath awareness exercise, focusing on the peaceful rhythm of your breath.",
            "Action 2": "Engage in a daily activity (like eating or walking) with full, joyful attention to your senses and the present moment.",
            "Imagery Idea1": "A calm, still pond reflecting a vibrant, detailed world",
            "Imagery Idea2": "a person sitting peacefully amidst a swirling storm of colorful thoughts, holding a single glowing anchor."
        },
        {
            "Concept": "Movement",
            "Journal Prompt": "Where in your life can you invite more joyful movement, both physically and in terms of embracing change?",
            "Action 1": "Go for a walk or engage in any form of physical activity that feels fun and energizing.",
            "Action 2": "Journal about a situation where you feel a bit stuck and brainstorm three small, positive \"moves\" you could make.",
            "Imagery Idea1": "A playful figure dancing freely amidst swirling, colorful lines",
            "Imagery Idea2": "a vibrant river changing course through a majestic landscape."
        },
        {
            "Concept": "Negotiation",
            "Journal Prompt": "What's a situation where you found a \"win for all\" solution that delighted everyone involved?",
            "Action 1": "Practice active listening to truly understand the other person's needs and positive intentions in a conflict.",
            "Action 2": "Brainstorm three creative solutions to a disagreement that could benefit everyone involved, focusing on shared gains.",
            "Imagery Idea1": "Two colorful figures building a bridge together from two opposite sides",
            "Imagery Idea2": "a puzzle with glowing, perfectly fitting pieces."
        },
        {
            "Concept": "Now",
            "Journal Prompt": "What worries about the past or future are currently distracting you from the peace and beauty of the present moment?",
            "Action 1": "Choose one activity today to do without any multitasking or distractions, focusing solely on the \"now\" with joy.",
            "Action 2": "Practice \"powering down\" for 15 minutes – turn off all devices and simply be, savoring the present.",
            "Imagery Idea1": "A vibrant, perfectly still hourglass with colorful sand",
            "Imagery Idea2": "a single, glowing, present moment represented by a shimmering spot of light."
        },
        {
            "Concept": "Observation",
            "Journal Prompt": "What unexpected beauty or interesting detail did you notice today because you were truly observing your surroundings?",
            "Action 1": "Spend 10 minutes observing your surroundings with all your senses, as if seeing them for the first time with wonder.",
            "Action 2": "Notice three positive non-verbal cues in your next conversation, appreciating the subtle communication.",
            "Imagery Idea1": "A magnifying glass revealing intricate, tiny details",
            "Imagery Idea2": "a calm, still eye reflecting a vibrant, detailed scene."
        },
        {
            "Concept": "Openness",
            "Journal Prompt": "To what new ideas, perspectives, or experiences have you been joyfully open lately, and how has it expanded you?",
            "Action 1": "Seek out a piece of news or an opinion that challenges your existing beliefs and try to understand its premise with positive curiosity.",
            "Action 2": "Engage in a conversation with someone who holds a different worldview than yours, focusing on listening rather than convincing.",
            "Imagery Idea1": "A door swinging wide open to a landscape of vibrant, unknown paths",
            "Imagery Idea2": "a brain with a swirling kaleidoscope of diverse ideas."
        },
        {
            "Concept": "Patience",
            "Journal Prompt": "Where in your life has practicing patience brought you a deeper sense of peace or a more joyful outcome?",
            "Action 1": "Practice waiting patiently in a queue or traffic without checking your phone, simply noticing the present moment.",
            "Action 2": "Focus on a task that requires sustained effort without immediate results, embracing the journey with calm anticipation.",
            "Imagery Idea1": "A colorful seedling slowly unfurling its leaves towards the sun",
            "Imagery Idea2": "a gentle, flowing river carving a path through solid rock."
        },
        {
            "Concept": "Perspective",
            "Journal Prompt": "What's a situation you're viewing from only one angle? How might it look from a positive, alternative point of view?",
            "Action 1": "Imagine seeing a current challenge from the viewpoint of someone you admire, focusing on their strength or wisdom.",
            "Action 2": "Ask \"What's another wonderful way to look at this?\" when faced with a rigid opinion (your own or others').",
            "Imagery Idea1": "A kaleidoscope rotating to reveal new, vibrant patterns",
            "Imagery Idea2": "a whimsical hot air balloon hovering above a landscape, offering a wide view."
        },
        {
            "Concept": "Play",
            "Journal Prompt": "When was the last time you engaged in pure, unstructured play that filled you with delight?",
            "Action 1": "Dedicate 15 minutes to a playful activity with no purpose other than enjoyment and lightheartedness.",
            "Action 2": "Introduce an element of play or lightness into a routine task, finding the fun in the everyday.",
            "Imagery Idea1": "A cascade of colorful bubbles and balloons",
            "Imagery Idea2": "a person joyfully skipping and dancing through a vibrant meadow."
        },
        {
            "Concept": "Possibility",
            "Journal Prompt": "What's a long-held \"impossible\" dream you've allowed yourself to joyfully envision lately? What if it was possible?",
            "Action 1": "Brainstorm 10 \"impossible\" solutions to a current challenge, without judgment, letting creativity flow.",
            "Action 2": "Engage in a creative activity that allows for limitless possibilities and fills you with wonder.",
            "Imagery Idea1": "A key unlocking a gate to a swirling galaxy of stars",
            "Imagery Idea2": "a person painting a vibrant, fantastical world onto a blank canvas."
        },
        {
            "Concept": "Presence",
            "Journal Prompt": "How often do you feel truly \"seen\" and heard in your interactions, and how often do you truly see and hear others with love?",
            "Action 1": "When speaking with someone, put away your phone and give them your undivided, joyful attention.",
            "Action 2": "Practice active listening in your next conversation, paraphrasing what the other person says to ensure understanding and connection.",
            "Imagery Idea1": "Two colorful figures with glowing auras, truly seeing each other",
            "Imagery Idea2": "a spotlight shining on a single, focused conversation amidst a busy scene."
        },
        {
            "Concept": "Purpose",
            "Journal Prompt": "What gives your life meaning and direction, filling you with a sense of joyful purpose?",
            "Action 1": "Reflect on your core values and how they connect to your sense of purpose, inspiring your actions.",
            "Action 2": "Identify one small action you can take today that joyfully aligns with your deeper purpose.",
            "Imagery Idea1": "A shining star guiding a colorful ship across a night sky",
            "Imagery Idea2": "a person standing tall, illuminated by a glowing inner compass."
        },
        {
            "Concept": "Questions",
            "Journal Prompt": "What is one \"beautiful question\" you could ask yourself today that would unlock new, positive possibilities?",
            "Action 1": "Throughout the day, reframe statements into questions to encourage deeper, more hopeful thought.",
            "Action 2": "Ask a \"generative question\" in a group setting that encourages new, creative ideas and positive perspectives.",
            "Imagery Idea1": "A key made of a question mark unlocking a treasure chest filled with glowing answers",
            "Imagery Idea2": "a path unfurling from a single, well-placed question mark."
        },
        {
            "Concept": "Reflection",
            "Journal Prompt": "When do you make time for quiet reflection that brings you peace and clarity? How does it help you process experiences?",
            "Action 1": "Dedicate 15 minutes to journaling or silent contemplation at the end of your day, noting moments of joy or insight.",
            "Action 2": "Review a past decision or experience with gentle curiosity and consider what positive lessons you learned from it.",
            "Imagery Idea1": "A calm, shimmering pool reflecting a vibrant, thoughtful moon",
            "Imagery Idea2": "a mirror showing a person's inner glow and wisdom."
        },
        {
            "Concept": "Renewal",
            "Journal Prompt": "What brings you a sense of rejuvenation and fresh, positive energy? How often do you seek it out?",
            "Action 1": "Spend time in nature, allowing yourself to feel refreshed, re-energized, and deeply connected to the world.",
            "Action 2": "Engage in an activity that helps you \"reset\" your mind and body, feeling revitalized and ready for joy.",
            "Imagery Idea1": "A vibrant phoenix rising from colorful ashes",
            "Imagery Idea2": "a spring flower unfurling after a long winter, radiating new energy."
        },
        {
            "Concept": "Resilience",
            "Journal Prompt": "When have you joyfully bounced back from a setback or difficulty, finding unexpected strength?",
            "Action 1": "Recall a past challenge you overcame and truly savor the feeling of strength and wisdom gained.",
            "Action 2": "When faced with a minor setback, focus on finding one small, positive step forward with a sense of determination.",
            "Imagery Idea1": "A flexible, colorful tree bending in a strong wind but not breaking",
            "Imagery Idea2": "a playful rebound ball bouncing back higher."
        },
        {
            "Concept": "Responsibility",
            "Journal Prompt": "Where in your life has taking joyful responsibility for your choices led to empowering outcomes?",
            "Action 1": "Identify one area where you've been playing the victim and commit to taking ownership for your part with a positive mindset.",
            "Action 2": "Clearly communicate your boundaries and expectations to someone, taking joyful responsibility for your needs and well-being.",
            "Imagery Idea1": "A person confidently holding the reins of a vibrant, colorful hot air balloon",
            "Imagery Idea2": "a playful character catching a falling ball with a knowing smile."
        },
        {
            "Concept": "Self-Compassion",
            "Journal Prompt": "How do you typically speak to yourself when you make a mistake? Practice speaking to yourself with gentle kindness and understanding.",
            "Action 1": "Write a compassionate letter to yourself about a current struggle or perceived flaw, offering words of encouragement.",
            "Action 2": "Practice a self-compassion break: acknowledge your suffering, recognize common humanity, and offer yourself true kindness.",
            "Imagery Idea1": "A warm, glowing hand gently cradling a small, slightly bruised heart",
            "Imagery Idea2": "a person giving themselves a cozy, colorful hug."
        },
        {
            "Concept": "Sovereignty",
            "Journal Prompt": "Where do you feel most authentically in charge of your own life and joyful choices?",
            "Action 1": "Make one small decision today based purely on your own desires and inner wisdom, without seeking external approval.",
            "Action 2": "Practice setting a firm boundary to protect your time or energy, affirming your right to well-being.",
            "Imagery Idea1": "A person wearing a vibrant, glowing crown of self-power",
            "Imagery Idea2": "a unique, colorful flag planted firmly on a personal island."
        },
        {
            "Concept": "Spaciousness",
            "Journal Prompt": "Where in your life can you create more mental or physical space to breathe, reflect, and feel at peace?",
            "Action 1": "Take a few deep breaths and consciously create space between your thoughts, finding calm.",
            "Action 2": "Declutter one small area of your physical environment, enjoying the lightness it brings.",
            "Imagery Idea1": "A vast, open sky filled with wisps of colorful clouds",
            "Imagery Idea2": "a serene, empty room with a single glowing, inviting cushion."
        },
        {
            "Concept": "Stillness",
            "Journal Prompt": "How often do you allow yourself to be truly still, without external distractions or internal chatter, finding peace in the moment?",
            "Action 1": "Practice a 5-minute silent meditation, focusing on your breath and allowing a sense of calm to settle.",
            "Action 2": "Turn off all notifications and sit quietly for 10 minutes, simply observing the gentle flow of life around you.",
            "Imagery Idea1": "A calm, perfectly still lake reflecting a vibrant, starry night",
            "Imagery Idea2": "a gentle, quiet light radiating peace."
        },
        {
            "Concept": "Transformation",
            "Journal Prompt": "What area of your life feels ready for a joyful and positive change? What might that transformation look like?",
            "Action 1": "Identify one small habit you can change today that will contribute to a larger, positive transformation.",
            "Action 2": "Visualize yourself living in a wonderfully transformed way and fully immerse yourself in the feeling of joy and peace.",
            "Imagery Idea1": "A vibrant cocoon opening to reveal a dazzling butterfly",
            "Imagery Idea2": "a bridge arching over a dramatic, colorful chasm."
        },
        {
            "Concept": "Trust",
            "Journal Prompt": "In what areas of your life has trusting yourself or others led to positive outcomes and peace of mind?",
            "Action 1": "Identify one small act of self-trust you can take today (e.g., following an intuition, saying no to something that doesn't feel right).",
            "Action 2": "Delegate a task you usually do yourself to someone else, practicing trusting their ability with a positive outlook.",
            "Imagery Idea1": "A colorful bridge forming across a shimmering chasm",
            "Imagery Idea2": "two whimsical characters holding hands and leaning back, fully supported by each other."
        },
        {
            "Concept": "Uncertainty",
            "Journal Prompt": "When has embracing uncertainty, with an open heart, led to unexpected positive discoveries or growth?",
            "Action 1": "Practice tolerating a small amount of uncertainty today, such as not planning out every detail of an activity, and finding the adventure in it.",
            "Action 2": "Reflect on a past experience where you navigated uncertainty successfully and draw strength and a sense of calm from that.",
            "Imagery Idea1": "A foggy path with glimpses of vibrant, unknown landscapes ahead",
            "Imagery Idea2": "a person confidently stepping into a colorful mist."
        },
        {
            "Concept": "Vibrancy",
            "Journal Prompt": "When do you feel most alive, energetic, and colorful in your being? How can you amplify that feeling?",
            "Action 1": "Engage in an activity that makes you feel fully alive and energized, letting your inner light shine.",
            "Action 2": "Wear colors that make you feel vibrant and joyful, embracing your unique expression.",
            "Imagery Idea1": "An explosion of bright, dazzling colors radiating outward",
            "Imagery Idea2": "a person glowing with inner light and energy."
        },
        {
            "Concept": "Vulnerability",
            "Journal Prompt": "What's a fear or insecurity you typically try to hide? What would it feel like to share it with someone you deeply trust, and what positive connection might it bring?",
            "Action 1": "Share a minor vulnerability with a trusted friend or colleague, experiencing the lightness of connection.",
            "Action 2": "Allow yourself to be seen imperfectly in a social setting, rather than striving for perfection, embracing your authentic self.",
            "Imagery Idea1": "A delicate, glowing bubble held gently in an open hand",
            "Imagery Idea2": "a person with a transparent, shimmering heart, revealing their true feelings."
        },
        {
            "Concept": "Wholeheartedness",
            "Journal Prompt": "When do you feel most engaged and fully present in what you're doing, pouring your whole joyful self into it?",
            "Action 1": "Choose one task today and commit to doing it with your full attention and effort, without distraction, finding joy in the process.",
            "Action 2": "Identify an area where you've been holding back and commit to showing up more fully and authentically, embracing your true power.",
            "Imagery Idea1": "A vibrant, overflowing heart radiating colorful light",
            "Imagery Idea2": "a person diving fully into a swirling pool of activity with a joyful splash."
        },
        {
            "Concept": "Wisdom",
            "Journal Prompt": "What is the wisest decision you've ever made that brought you peace or a profound positive outcome?",
            "Action 1": "Reflect on a past challenge and joyfully identify the wisdom you gained from the experience.",
            "Action 2": "Seek out advice from someone you consider wise or read a book on a philosophical topic that uplifts your spirit.",
            "Imagery Idea1": "An ancient, glowing tree with deep roots and shimmering leaves",
            "Imagery Idea2": "a wise, old owl with eyes that sparkle with understanding."
        },
        {
            "Concept": "Yes",
            "Journal Prompt": "To what positive opportunities, experiences, or possibilities are you currently saying \"no\" out of habit or fear?",
            "Action 1": "Say \"yes\" to an invitation or opportunity that you would normally decline, as long as it genuinely aligns with your values and joy.",
            "Action 2": "Identify one small way you can say \"yes\" to your own needs or desires today, affirming your well-being.",
            "Imagery Idea1": "A playful figure jumping enthusiastically into a swirling portal of possibilities",
            "Imagery Idea2": "a large, joyful \"YES!\" bursting with colorful fireworks."
        },
        {
            "Concept": "Zenith",
            "Journal Prompt": "When have you experienced a peak moment of clarity, achievement, or deep connection that filled you with immense joy and peace? ",
            "Action 1": "Take a moment to reflect on a personal success or accomplishment and truly savor the feeling of triumph and positive energy.",
            "Action 2": "Visualize yourself achieving a significant goal and fully immerse yourself in the feeling of reaching your \"zenith\" with joyful anticipation.",
            "Imagery Idea1": "A vibrant, glowing mountaintop bathed in colorful light",
            "Imagery Idea2": "a figure standing triumphantly at the top of a swirling, rainbow ladder."
        }
    ];

    let currentCardIndex = 0; // Initialize current card index
    
    // Colors for the random card backgrounds
    const cardColors = [
        { primary: '#64D9C3', secondary: '#4AA094' }, // Teal
        { primary: '#A8DADC', secondary: '#6DBCB6' }, // Light Blue/Green
        { primary: '#E0BBE4', secondary: '#957DAD' }, // Lavender
        { primary: '#90EE90', secondary: '#6B8E23' }, // Light Green
        { primary: '#FDD49E', secondary: '#F0B27A' }, // Peach/Orange
        { primary: '#ADD8E6', secondary: '#87CEEB' }, // Light Sky Blue
        { primary: '#FFD700', secondary: '#DAA520' }, // Gold
        { primary: '#C1E1C1', secondary: '#A0D4A0' }, // Pastel Green
        { primary: '#FFB6C1', secondary: '#F08080' }, // Light Coral
        { primary: '#87CEFA', secondary: '#6A5ACD' }  // Light Steel Blue
    ];

    // Helper to determine if a color is light or dark for dynamic text color
    function isColorLight(hexColor) {
        const r = parseInt(hexColor.substring(1, 3), 16);
        const g = parseInt(hexColor.substring(3, 5), 16);
        const b = parseInt(hexColor.substring(5, 7), 16);
        // Perceived brightness calculation
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 180; // Threshold can be adjusted
    }

    /**
     * Helper function to get a slightly darker or lighter version of a color for gradients.
     * This is a simplified function and might not work perfectly for all colors,
     * but it provides a decent gradient effect.
     * @param {string} hex - The hex color string (e.g., "#RRGGBB")
     * @param {number} percent - The percentage to darken/lighten (e.g., -10 for 10% darker)
     * @returns {string} The new hex color string.
     */
    function adjustColorBrightness(hex, percent) {
        let f = parseInt(hex.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = f >> 16,
            G = (f >> 8) & 0x00ff,
            B = f & 0x0000ff;
        return (
            "#" +
            (
                0x1000000 +
                (Math.round((t - R) * p) + R) * 0x10000 +
                (Math.round((t - G) * p) + G) * 0x100 +
                (Math.round((t - B) * p) + B)
            )
            .toString(16)
            .slice(1)
        );
    }

    /**
     * Dynamically sets the height of the card-inner based on the content of its tallest side.
     * This ensures no text overflow occurs, even with varying content lengths.
     */
    function setCardHeight() {
        // Temporarily reset display to allow scrollHeight to be accurate
        cardInner.style.height = 'auto';
        cardInner.style.minHeight = '0'; // Temporarily unset min-height from CSS for accurate measurement

        // Temporarily set faces to static positioning to measure natural height
        cardFrontDiv.style.position = 'static';
        cardBackDiv.style.position = 'static';

        // Measure heights after content has rendered and positioning is static
        let frontHeight = cardFrontDiv.scrollHeight;
        let backHeight = cardBackDiv.scrollHeight;

        // Restore absolute positioning
        cardFrontDiv.style.position = 'absolute';
        cardBackDiv.style.position = 'absolute';

        // Determine the maximum height needed
        let maxHeight = Math.max(frontHeight, backHeight);

        // Apply a minimum height to prevent it from being too small on short content
        const minCardHeight = window.innerWidth <= 480 ? 150 : (window.innerWidth <= 768 ? 180 : 250);
        maxHeight = Math.max(maxHeight, minCardHeight);

        // Apply the calculated max height to card-inner
        cardInner.style.height = `${maxHeight}px`;
        // Also apply the min-height if the calculated height is less than the baseline
        cardInner.style.minHeight = `${minCardHeight}px`;

        // Log for debugging
        // console.log(`Front Height: ${frontHeight}px, Back Height: ${backHeight}px, Set Height: ${maxHeight}px`);
    }


    /**
     * Displays a random card from the journalData array.
     * Includes a subtle fade-out/fade-in animation for smoother transitions
     * and text fade-in.
     */
    function displayRandomCard() {
        // Ensure card is on the front side and not flipped when a new card is loaded
        currentCard.classList.remove('flipped');

        // Clear any previous text animation classes from the front content
        cardFrontTitle.classList.remove('text-fade-in');
        cardFrontContentDiv.classList.remove('text-fade-in');

        // Add fade-out class to current card container
        currentCard.classList.add('fade-out');

        // After the fade-out, update content and fade in
        setTimeout(() => {
            if (journalData.length === 0) {
                cardConcept.textContent = "No cards available.";
                cardPrompt.textContent = "Please add data to the journalData array in script.js.";
                cardActions.textContent = "";
                cardConceptBack.textContent = ""; // Clear back concept too
                cardFrontDiv.style.background = '#ccc'; // Set a default background if no data
                currentCard.classList.remove('fade-out'); // Ensure it's visible if no data
                setCardHeight(); // Adjust height even for no data state
                return;
            }

            const randomIndex = Math.floor(Math.random() * journalData.length);
            const randomCard = journalData[randomIndex];

            const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];

            // Apply the random color with a subtle linear gradient to the card-front
            cardFrontDiv.style.setProperty('background', `linear-gradient(to bottom right, ${randomColor.primary}, ${randomColor.secondary})`, 'important');

            // Set text color dynamically based on primary color brightness
            const textColor = isColorLight(randomColor.primary) ? '#333' : '#fff';
            cardFrontTitle.style.color = textColor;
            cardFrontLabel.style.color = textColor;
            cardFrontText.style.color = textColor;

            // Ensure branding color matches for the front
            const cardBrandingFront = currentCard.querySelector('.card-branding:not(.card-branding-back)');
            if (cardBrandingFront) {
                cardBrandingFront.style.color = isColorLight(randomColor.primary) ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)';
                cardBrandingFront.style.textShadow = isColorLight(randomColor.primary) ? 'none' : '0px 0px 4px rgba(0,0,0,0.5)';
            }

            // Update content for the front of the card
            cardConcept.textContent = randomCard.Concept;
            cardPrompt.textContent = randomCard["Journal Prompt"];
            
            // Update content for the back of the card
            cardConceptBack.textContent = randomCard.Concept; // Concept on the back as well
            let actionsText = "";
            if (randomCard["Action 1"]) {
                actionsText += `<div class="action-item"><img src="lotus.png" alt="lotus icon" class="action-bullet-icon"> ${randomCard["Action 1"]}</div>`;
            }
            if (randomCard["Action 2"]) {
                if (actionsText !== "") {
                    // If action 1 exists, add a clear separation with a new line for the div
                    actionsText += "\n"; 
                }
                actionsText += `<div class="action-item"><img src="lotus.png" alt="lotus icon" class="action-bullet-icon"> ${randomCard["Action 2"]}</div>`;
            }
            cardActions.innerHTML = actionsText; // Use innerHTML because we are inserting HTML now


            // Remove fade-out and add fade-in for the card container
            currentCard.classList.remove('fade-out');
            currentCard.classList.add('fade-in');

            // After new content is set, adjust height
            setCardHeight();

            // Add text-fade-in class after a slight delay to allow card animation to start
            setTimeout(() => {
                // Apply animation to the card title and the content div on the front
                cardFrontTitle.classList.add('text-fade-in');
                cardFrontContentDiv.classList.add('text-fade-in');
            }, 100); // Small delay before text starts animating

            // Remove fade-in class after card animation to prepare for next fade-out
            currentCard.addEventListener('animationend', (event) => {
                if (event.animationName === 'fade-in') { // Ensure it's the card's fade-in animation
                    currentCard.classList.remove('fade-in');
                }
            }, { once: true });
        }, 500); // Match CSS transition duration for card fade-out (0.5s)
    }

    /**
     * Toggles the 'flipped' class on the card to show its back or front.
     * Recalculates height after flip, as content might become visible that changes height.
     */
    function flipCard() {
        currentCard.classList.toggle('flipped');
        // Ensure height is correct after flip
        setTimeout(setCardHeight, 500); // Adjust height after flip animation starts
    }

    /**
     * Prepares an email with the card's content and opens the user's email client.
     */
    async function shareCardContent() {
        const cardToShare = document.getElementById('current-card');
        const copyMessage = document.getElementById('copy-message');

        // No longer need to hide flip buttons or branding here, as generateCombinedCardImage handles temporary elements
        
        // Add loading state
        currentCard.classList.add('loading');

        try {
            // Generate the combined image of front and back
            const image = await generateCombinedCardImage('current-card');
            const fileName = 'conscious-card-combined.png';

            // Remove loading state
            currentCard.classList.remove('loading');

            // Try Web Share API first
            if (navigator.share) {
                fetch(image)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], fileName, { type: 'image/png' });
                        navigator.share({
                                files: [file],
                                title: 'Conscious Card',
                                text: 'Check out this mindful reflection from Conscious Cards!',
                            })
                            .then(() => console.log('Share successful'))
                            .catch((error) => console.error('Sharing failed', error));
                    })
                    .catch(error => {
                        console.error('Error fetching image for share:', error);
                        fallbackDownload(); // Fallback to download if fetch fails
                    });
            } else {
                // Fallback for browsers not supporting Web Share API
                fallbackDownload();
            }

            function fallbackDownload() {
                const a = document.createElement('a');
                a.href = image;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                showCopyMessage('Image downloaded! You can share it now.');
            }
        } catch (error) {
            currentCard.classList.remove('loading');
            console.error("Error in shareCardContent:", error);
            showCopyMessage('Failed to generate image. Try again.');
        }
    }

    // Helper function to show and hide copy message
    function showCopyMessage(message) {
        copyMessage.textContent = message;
        copyMessage.classList.remove('hidden');
        copyMessage.classList.add('show');
        setTimeout(() => {
            copyMessage.classList.remove('show');
            copyMessage.classList.add('hidden');
        }, 3000); // Message visible for 3 seconds
    }

    /**
     * Generates a single image containing both the front and back of the card, side-by-side.
     * This function creates a temporary, off-screen representation of the card
     * to capture both its front and back content simultaneously using html2canvas.
     *
     * @param {string} cardId The ID of the main card element (e.g., 'current-card').
     * @returns {Promise<string>} A Promise that resolves with the Data URI of the combined image.
     */
    async function generateCombinedCardImage(cardId) {
        const originalCard = document.getElementById(cardId);
        if (!originalCard) {
            console.error(`Card with ID ${cardId} not found.`);
            throw new Error(`Card with ID ${cardId} not found.`);
        }

        // Create a temporary container to hold the elements for rendering
        const tempRenderContainer = document.createElement('div');
        tempRenderContainer.style.position = 'absolute'; // Position off-screen
        tempRenderContainer.style.left = '-9999px';
        tempRenderContainer.style.top = '-9999px';
        tempRenderContainer.style.zIndex = '-100'; // Ensure it's behind everything
        tempRenderContainer.style.padding = '30px'; // Padding around the combined view
        tempRenderContainer.style.backgroundColor = '#f8f9fa'; // Base background for the combined image
        tempRenderContainer.style.boxSizing = 'border-box';
        tempRenderContainer.style.display = 'flex'; // Use flexbox to arrange cloned cards
        tempRenderContainer.style.gap = '30px'; // Space between front and back
        tempRenderContainer.style.maxWidth = '1400px'; // Max width for the combined image
        tempRenderContainer.style.width = 'fit-content'; // Or a fixed large width, e.g., '1400px'
        document.body.appendChild(tempRenderContainer);

        // Clone the relevant parts: card-front and card-back directly
        // This simplifies handling the 3D transforms of .card-inner
        const originalFront = originalCard.querySelector('.card-front');
        const originalBack = originalCard.querySelector('.card-back');

        const clonedFront = originalFront.cloneNode(true);
        const clonedBack = originalBack.cloneNode(true);

        // Apply temporary styles to clones to make them visible and arranged side-by-side
        clonedFront.style.position = 'relative'; // Override absolute positioning
        clonedFront.style.transform = 'none'; // Remove any previous transforms
        clonedFront.style.backfaceVisibility = 'visible'; // Ensure content is always visible
        clonedFront.style.width = '600px'; // Set a fixed width for each card side in the combined image
        clonedFront.style.height = 'auto'; // Auto height based on content
        clonedFront.style.minHeight = '400px'; // Ensure a minimum height if content is sparse
        clonedFront.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)'; // Keep original shadow
        clonedFront.style.margin = '0'; // Remove any external margins

        clonedBack.style.position = 'relative'; // Override absolute positioning
        clonedBack.style.transform = 'none'; // Remove any previous transforms (like rotateY)
        clonedBack.style.backfaceVisibility = 'visible'; // Ensure content is always visible
        clonedBack.style.width = '600px'; // Match front width
        clonedBack.style.height = 'auto';
        clonedBack.style.minHeight = '400px'; // Match front min-height
        clonedBack.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)'; // Keep original shadow
        clonedBack.style.margin = '0';

        // Important: Copy the *computed* dynamic colors from the original elements
        // This ensures the rendered clones have the correct background and text colors
        const computedFrontStyle = window.getComputedStyle(originalFront);
        const computedBackStyle = window.getComputedStyle(originalBack);

        clonedFront.style.background = computedFrontStyle.background;
        clonedFront.style.color = computedFrontStyle.color;
        clonedFront.querySelectorAll('.card-title, .card-label, .card-text').forEach(el => {
            el.style.color = computedFrontStyle.color;
        });
        if (clonedFront.querySelector('.card-branding')) {
            clonedFront.querySelector('.card-branding').style.color = window.getComputedStyle(originalFront.querySelector('.card-branding')).color;
            clonedFront.querySelector('.card-branding').style.textShadow = window.getComputedStyle(originalFront.querySelector('.card-branding')).textShadow;
        }


        clonedBack.style.background = computedBackStyle.background;
        clonedBack.style.color = computedBackStyle.color;
        clonedBack.querySelectorAll('.card-title, .card-label, .card-text').forEach(el => {
            el.style.color = computedBackStyle.color;
        });
        if (clonedBack.querySelector('.card-branding.card-branding-back')) {
            clonedBack.querySelector('.card-branding.card-branding-back').style.color = window.getComputedStyle(originalBack.querySelector('.card-branding.card-branding-back')).color;
            clonedBack.querySelector('.card-branding.card-branding-back').style.textShadow = window.getComputedStyle(originalBack.querySelector('.card-branding.card-branding-back')).textShadow;
        }

        // Append cloned elements to the temporary container
        tempRenderContainer.appendChild(clonedFront);
        tempRenderContainer.appendChild(clonedBack);

        try {
            // Use html2canvas to render the temporary container
            const canvas = await html2canvas(tempRenderContainer, {
                scale: 2, // High resolution for better image quality
                useCORS: true, // Important for images loaded from different origins (like Joyful.png if it were from CDN)
                logging: false, // Suppress html2canvas logs
                backgroundColor: null, // Allow the tempContainer's background to be the canvas background
            });

            // Convert the canvas content into a PNG Data URI
            const dataUri = canvas.toDataURL('image/png');

            // Log the Data URI to the console
            console.log('Generated Combined Card Data URI:', dataUri);

            return dataUri; // Return the Data URI

        } catch (error) {
            console.error("Error generating combined card image:", error);
            throw error; // Re-throw to propagate the error
        } finally {
            // Clean up: remove temporary container from DOM
            if (document.body.contains(tempRenderContainer)) {
                document.body.removeChild(tempRenderContainer);
            }
        }
    }

    // Initial setup on page load
    // Note: fetchCardData is removed as data is inline, but keep for future external data loading
    displayRandomCard(); // Display the first card

    // Event listener for the "New Card" button
    newCardBtn.addEventListener('click', displayRandomCard);

    // Event listener for the "Share with a friend" button
    shareCardBtn.addEventListener('click', shareCardContent);

    // Event listeners for the flip buttons
    flipToBackButton.addEventListener('click', flipCard);
    flipToFrontButton.addEventListener('click', flipCard);

    // Adjust card height on window resize, with a debounce for performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setCardHeight, 200); // Debounce to avoid excessive calls
    });

    // Initial height setting after DOM is loaded and content is populated
    // A small delay helps ensure all fonts/content are rendered before measurement
    setTimeout(setCardHeight, 100);
});
