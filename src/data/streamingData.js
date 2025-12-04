// Netflix Streaming Data - Mock Dataset for Visualization

const streamingData = {
    // Timeline data: Monthly content releases and viewership (2020-2024)
    timeline: [
        { date: '2020-01', releases: 45, viewership: 167, hours: 2.1 },
        { date: '2020-04', releases: 52, viewership: 182, hours: 2.3 },
        { date: '2020-07', releases: 61, viewership: 195, hours: 2.5 },
        { date: '2020-10', releases: 58, viewership: 203, hours: 2.6 },
        { date: '2021-01', releases: 67, viewership: 204, hours: 2.4 },
        { date: '2021-04', releases: 71, viewership: 208, hours: 2.5 },
        { date: '2021-07', releases: 78, viewership: 214, hours: 2.6 },
        { date: '2021-10', releases: 82, viewership: 221, hours: 2.7 },
        { date: '2022-01', releases: 89, viewership: 222, hours: 2.5 },
        { date: '2022-04', releases: 94, viewership: 221, hours: 2.4 },
        { date: '2022-07', releases: 97, viewership: 223, hours: 2.5 },
        { date: '2022-10', releases: 103, viewership: 227, hours: 2.6 },
        { date: '2023-01', releases: 108, viewership: 231, hours: 2.7 },
        { date: '2023-04', releases: 115, viewership: 233, hours: 2.7 },
        { date: '2023-07', releases: 122, viewership: 238, hours: 2.8 },
        { date: '2023-10', releases: 128, viewership: 243, hours: 2.9 },
        { date: '2024-01', releases: 134, viewership: 247, hours: 2.9 },
        { date: '2024-04', releases: 141, viewership: 251, hours: 3.0 },
        { date: '2024-07', releases: 148, viewership: 256, hours: 3.1 },
        { date: '2024-10', releases: 155, viewership: 260, hours: 3.2 }
    ],

    // Genre distribution data
    genres: {
        name: 'Netflix Library',
        children: [
            {
                name: 'Drama',
                value: 3200,
                color: '#E50914'
            },
            {
                name: 'Comedy',
                value: 2800,
                color: '#F40612'
            },
            {
                name: 'Action',
                value: 2100,
                color: '#FF6B6B'
            },
            {
                name: 'Documentary',
                value: 1800,
                color: '#4ECDC4'
            },
            {
                name: 'Thriller',
                value: 1600,
                color: '#A855F7'
            },
            {
                name: 'Romance',
                value: 1400,
                color: '#FF69B4'
            },
            {
                name: 'Sci-Fi',
                value: 1200,
                color: '#0071EB'
            },
            {
                name: 'Horror',
                value: 900,
                color: '#8B0000'
            },
            {
                name: 'Animation',
                value: 850,
                color: '#FFD700'
            },
            {
                name: 'Family',
                value: 750,
                color: '#46D369'
            }
        ]
    },

    // Global viewership data by country
    globalViewership: [
        { country: 'United States', code: 'USA', subscribers: 75.5, engagement: 92 },
        { country: 'Brazil', code: 'BRA', subscribers: 18.2, engagement: 88 },
        { country: 'United Kingdom', code: 'GBR', subscribers: 16.8, engagement: 85 },
        { country: 'Mexico', code: 'MEX', subscribers: 12.4, engagement: 87 },
        { country: 'Germany', code: 'DEU', subscribers: 11.9, engagement: 83 },
        { country: 'France', code: 'FRA', subscribers: 10.2, engagement: 81 },
        { country: 'Japan', code: 'JPN', subscribers: 9.8, engagement: 79 },
        { country: 'India', code: 'IND', subscribers: 8.5, engagement: 86 },
        { country: 'South Korea', code: 'KOR', subscribers: 7.3, engagement: 91 },
        { country: 'Spain', code: 'ESP', subscribers: 6.9, engagement: 82 },
        { country: 'Italy', code: 'ITA', subscribers: 6.2, engagement: 80 },
        { country: 'Canada', code: 'CAN', subscribers: 5.8, engagement: 89 },
        { country: 'Australia', code: 'AUS', subscribers: 5.1, engagement: 87 },
        { country: 'Argentina', code: 'ARG', subscribers: 4.7, engagement: 85 },
        { country: 'Poland', code: 'POL', subscribers: 4.2, engagement: 78 },
        { country: 'Netherlands', code: 'NLD', subscribers: 3.8, engagement: 84 },
        { country: 'Turkey', code: 'TUR', subscribers: 3.5, engagement: 82 },
        { country: 'Sweden', code: 'SWE', subscribers: 3.1, engagement: 86 },
        { country: 'Philippines', code: 'PHL', subscribers: 2.9, engagement: 88 },
        { country: 'Thailand', code: 'THA', subscribers: 2.6, engagement: 84 }
    ],

    // Top performing content
    topContent: [
        { title: 'Stranger Things S4', views: 1.35, rating: 8.7, genre: 'Sci-Fi' },
        { title: 'Wednesday', views: 1.24, rating: 8.1, genre: 'Comedy' },
        { title: 'The Night Agent', views: 0.98, rating: 7.5, genre: 'Thriller' },
        { title: 'Ginny & Georgia S2', views: 0.92, rating: 7.6, genre: 'Drama' },
        { title: 'The Glory', views: 0.89, rating: 8.9, genre: 'Drama' },
        { title: 'You S4', views: 0.85, rating: 7.7, genre: 'Thriller' },
        { title: 'The Witcher S3', views: 0.81, rating: 7.9, genre: 'Fantasy' },
        { title: 'Outer Banks S3', views: 0.78, rating: 7.5, genre: 'Adventure' },
        { title: 'Queen Charlotte', views: 0.73, rating: 7.8, genre: 'Drama' },
        { title: 'The Diplomat', views: 0.68, rating: 8.0, genre: 'Drama' }
    ],

    // Scatter plot data: Rating vs Viewership
    scatterData: [
        { title: 'Stranger Things S4', rating: 8.7, viewership: 1350, genre: 'Sci-Fi' },
        { title: 'Wednesday', rating: 8.1, viewership: 1240, genre: 'Comedy' },
        { title: 'The Glory', rating: 8.9, viewership: 890, genre: 'Drama' },
        { title: 'The Night Agent', rating: 7.5, viewership: 980, genre: 'Thriller' },
        { title: 'Ginny & Georgia S2', rating: 7.6, viewership: 920, genre: 'Drama' },
        { title: 'You S4', rating: 7.7, viewership: 850, genre: 'Thriller' },
        { title: 'The Witcher S3', rating: 7.9, viewership: 810, genre: 'Fantasy' },
        { title: 'Outer Banks S3', rating: 7.5, viewership: 780, genre: 'Adventure' },
        { title: 'Queen Charlotte', rating: 7.8, viewership: 730, genre: 'Drama' },
        { title: 'The Diplomat', rating: 8.0, viewership: 680, genre: 'Drama' },
        { title: 'Beef', rating: 8.3, viewership: 620, genre: 'Drama' },
        { title: 'The Last of Us', rating: 8.8, viewership: 590, genre: 'Sci-Fi' },
        { title: 'Kaleidoscope', rating: 6.9, viewership: 550, genre: 'Thriller' },
        { title: 'Shadow and Bone S2', rating: 7.6, viewership: 510, genre: 'Fantasy' },
        { title: 'The Recruit', rating: 7.3, viewership: 480, genre: 'Action' },
        { title: 'Lockwood & Co', rating: 7.4, viewership: 420, genre: 'Fantasy' },
        { title: 'Vikings: Valhalla S2', rating: 7.5, viewership: 390, genre: 'Action' },
        { title: 'The Watcher', rating: 7.1, viewership: 360, genre: 'Thriller' },
        { title: 'From Scratch', rating: 8.1, viewership: 340, genre: 'Drama' },
        { title: 'The Midnight Club', rating: 6.8, viewership: 310, genre: 'Horror' }
    ],

    // Weekly engagement patterns
    weeklyEngagement: [
        { day: 'Monday', hours: 2.1, completionRate: 68 },
        { day: 'Tuesday', hours: 2.3, completionRate: 71 },
        { day: 'Wednesday', hours: 2.4, completionRate: 72 },
        { day: 'Thursday', hours: 2.6, completionRate: 74 },
        { day: 'Friday', hours: 3.2, completionRate: 78 },
        { day: 'Saturday', hours: 3.8, completionRate: 82 },
        { day: 'Sunday', hours: 3.5, completionRate: 80 }
    ]
};

// Export for use in visualizations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = streamingData;
}
