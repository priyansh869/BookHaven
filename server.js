const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'bookstore-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Sample data - in a real app, this would come from a database
const categories = [
    { id: 1, name: 'Fiction', description: 'Novels, short stories, and other fictional works' },
    { id: 2, name: 'Non-Fiction', description: 'Biographies, history, science, and more' },
    { id: 3, name: 'Children', description: 'Books for kids and young adults' },
    { id: 4, name: 'Academic', description: 'Textbooks and educational materials' }
];

const featuredBooks = [
    { id: 1, title: 'The Great Novel', author: 'Jane Author', category: 'Fiction', price: 19.99, image: '/images/janne.jpeg' },
    { id: 2, title: 'History of Everything', author: 'John Historian', category: 'Non-Fiction', price: 24.99, image: '/images/john.jpeg' },
    { id: 3, title: 'Adventures of Max', author: 'Sam Writer', category: 'Children', price: 14.99, image: '/images/child.jpeg' }
];

// Expanded fiction books data
const fictionBooks = [
    { id: 1, title: 'The Great Novel', author: 'Jane Author', category: 'Fiction', price: 19.99, image: '/images/fiction1.jpg' },
    { id: 4, title: 'Mystery at Midnight', author: 'Arthur Mystery', category: 'Fiction', price: 18.50, image: '/images/fiction2.jpeg' },
    { id: 5, title: 'Summer Love', author: 'Emma Romance', category: 'Fiction', price: 15.99, image: '/images/fiction3.jpeg' },
    { id: 6, title: 'The Time Traveler', author: 'H.G. Wells', category: 'Fiction', price: 21.99, image: '/images/fiction4.jpeg' },
    { id: 7, title: 'Dragons of Fantasy', author: 'George Fantasy', category: 'Fiction', price: 22.99, image: '/images/fiction5.jpeg' },
    { id: 8, title: 'The Secret Garden', author: 'Frances Hodgson Burnett', category: 'Fiction', price: 17.50, image: '/images/fiction6.jpeg' }
];

// Non-Fiction books data
const nonFictionBooks = [
    { id: 2, title: 'History of Everything', author: 'John Historian', category: 'Non-Fiction', price: 24.99, image: '/images/nonfiction1.jpeg' },
    { id: 9, title: 'The Art of Cooking', author: 'Julia Chef', category: 'Non-Fiction', price: 29.99, image: '/images/nonfiction2.jpeg' },
    { id: 10, title: 'Biographies of Great Leaders', author: 'Mark Biographer', category: 'Non-Fiction', price: 22.50, image: '/images/nonfiction3.jpeg' },
    { id: 11, title: 'Science Explained', author: 'Neil Scientist', category: 'Non-Fiction', price: 26.99, image: '/images/nonfiction4.jpeg' },
    { id: 12, title: 'Mindfulness and Meditation', author: 'Sarah Guru', category: 'Non-Fiction', price: 18.99, image: '/images/nonfiction5.jpeg' },
    { id: 13, title: 'Travel Guide: Europe', author: 'Tim Traveler', category: 'Non-Fiction', price: 20.99, image: '/images/nonfiction6.jpeg' }
];

// Children's books data
const childrenBooks = [
    { id: 3, title: 'Adventures of Max', author: 'Sam Writer', category: 'Children', price: 14.99, image: '/images/kids1.jpeg' },
    { id: 14, title: 'The Magic Tree House', author: 'Mary Pope Osborne', category: 'Children', price: 12.99, image: '/images/kids2.jpeg' },
    { id: 15, title: 'Diary of a Young Explorer', author: 'Jeff Kinney', category: 'Children', price: 13.50, image: '/images/kids3.jpeg' },
    { id: 16, title: 'Fairytales Collection', author: 'Brothers Grimm', category: 'Children', price: 16.99, image: '/images/kids4.jpeg' },
    { id: 17, title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', category: 'Children', price: 11.99, image: '/images/kids5.jpeg' },
    { id: 18, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', category: 'Children', price: 19.99, image: '/images/kids6.jpeg' }
];

// Academic books data
const academicBooks = [
    { id: 19, title: 'Introduction to Psychology', author: 'David Myers', category: 'Academic', price: 59.99, image: '/images/acadmic1.jpeg' },
    { id: 20, title: 'Principles of Economics', author: 'N. Gregory Mankiw', category: 'Academic', price: 69.99, image: '/images/acadmic2.jpeg' },
    { id: 21, title: 'Organic Chemistry', author: 'John McMurry', category: 'Academic', price: 74.99, image: '/images/acadmic3.jpeg' },
    { id: 22, title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Academic', price: 79.99, image: '/images/acadmic4.jpeg' },
    { id: 23, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Academic', price: 64.99, image: '/images/acadmic5.jpeg' },
    { id: 24, title: 'A History of Western Philosophy', author: 'Bertrand Russell', category: 'Academic', price: 49.99, image: '/images/academic6.jpeg' }
];

// Mock user database (for demo purposes only - in a real app, use a proper database)
const users = [
    { id: 1, name: 'Demo User', email: 'user@example.com', password: 'password' }
];

// Make categories available to all views
app.use((req, res, next) => {
    res.locals.categories = categories;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Welcome to BookHaven',
        featuredBooks,
        categories,
        user: req.session.user
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        user: req.session.user
    });
});

// Books category routes
app.get('/fiction', (req, res) => {
    res.render('fiction', {
        title: 'Fiction Books',
        books: fictionBooks,
        user: req.session.user
    });
});

app.get('/non-fiction', (req, res) => {
    try {
        res.render('non-fiction', {
            title: 'Non-Fiction Books',
            books: nonFictionBooks,
            user: req.session.user
        });
    } catch (err) {
        console.error('Error rendering non-fiction page:', err);
        res.status(404).send(`
            <h1>Page Not Found</h1>
            <p>Sorry, the non-fiction page is currently unavailable.</p>
            <a href="/">Back to Home</a>
        `);
    }
});

app.get('/children', (req, res) => {
    res.render('children', {
        title: 'Children\'s Books',
        books: childrenBooks,
        user: req.session.user
    });
});

app.get('/academic', (req, res) => {
    try {
        res.render('academic', {
            title: 'Academic Books',
            books: academicBooks,
            user: req.session.user
        });
    } catch (err) {
        console.error('Error rendering academic page:', err);
        res.status(404).send(`
            <h1>Page Not Found</h1>
            <p>Sorry, the academic page is currently unavailable.</p>
            <a href="/">Back to Home</a>
        `);
    }
});


app.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }

    res.render('login', {
        title: 'Login',
        error: null,
        user: null,
        categories: categories
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        req.session.user = { id: user.id, email: user.email, name: user.name };

        const redirectTo = req.session.returnTo || '/';
        delete req.session.returnTo;
        res.redirect(redirectTo);
    } else {
        res.render('login', {
            title: 'Login',
            error: 'Invalid email or password',
            user: null,
            categories: categories
        });
    }
});

app.get('/signup', (req, res) => {

    if (req.session.user) {
        return res.redirect('/');
    }

    res.render('signup', {
        title: 'Sign Up',
        error: null,
        user: null,
        categories: categories
    });
});

app.post('/signup', (req, res) => {
    const { name, email, password, confirmPassword, agreeTerms } = req.body;

    if (!agreeTerms) {
        return res.render('signup', {
            title: 'Sign Up',
            error: 'You must agree to the Terms and Conditions',
            user: null,
            categories: categories
        });
    }

    if (password !== confirmPassword) {
        return res.render('signup', {
            title: 'Sign Up',
            error: 'Passwords do not match',
            user: null,
            categories: categories // Pass categories to the template
        });
    }

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        return res.render('signup', {
            title: 'Sign Up',
            error: 'Email is already in use',
            user: null,
            categories: categories // Pass categories to the template
        });
    }

    // Basic password strength validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.render('signup', {
            title: 'Sign Up',
            error: 'Password must be at least 8 characters and include numbers, uppercase and lowercase letters',
            user: null,
            categories: categories // Pass categories to the template
        });
    }

    // In a real app, you would hash the password before storing
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password // In a real app, store hashed password
    };

    // Add to mock database
    users.push(newUser);

    // Log the user in
    req.session.user = { id: newUser.id, name: newUser.name, email: newUser.email };
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
});

// Protected route middleware
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
    next();
};

// Example of a protected route
app.get('/profile', requireLogin, (req, res) => {
    res.render('profile', {
        title: 'My Profile',
        user: req.session.user
    });
});

app.get('/category/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.find(cat => cat.id === categoryId);

    if (!category) {
        return res.status(404).send(`
            <h1>Category Not Found</h1>
            <p>Sorry, the category you are looking for does not exist.</p>
            <a href="/">Back to Home</a>
        `);
    }

    // Get the appropriate books array based on category name
    let categoryBooks;
    switch (category.name) {
        case 'Fiction':
            categoryBooks = fictionBooks;
            break;
        case 'Non-Fiction':
            categoryBooks = nonFictionBooks;
            break;
        case 'Children':
            categoryBooks = childrenBooks;
            break;
        case 'Academic':
            categoryBooks = academicBooks;
            break;
        default:
            categoryBooks = [];
    }

    try {
        res.render('category', {
            title: `${category.name} Books`,
            category,
            books: categoryBooks,
            user: req.session.user
        });
    } catch (err) {
        console.error('Error rendering category page:', err);
        res.status(404).send(`
            <h1>${category.name} Books</h1>
            <p>Sorry, this page is currently under maintenance.</p>
            <a href="/">Back to Home</a>
        `);
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).send(`
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href="/">Back to Home</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});