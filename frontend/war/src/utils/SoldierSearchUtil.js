
const searchSoldierInDatabase = async (soldierName) => {
    // Replace this with your actual logic to search for the soldier in the database
    // You can use AJAX, fetch, or any other method to communicate with the server
    // and retrieve the search result
    // For now, let's assume the soldier is found with some details
    return await api.post('', {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        age: 25,
        gender: 'Male',
        city: 'Example City',
        date_of_death: new Date('2022-01-01'),
        hebrew_date: '01/01/5782',
        place_of_death: 'Example Place',
        rank_name: 'Sergeant',
        rank_organization: 'Example Organization',
        role: 'Example Role',
        short_description: 'Example short description.',
        long_description: 'Example long description.',
        image: 'https://example.com/john_doe.jpg',
        url_to_article: 'https://example.com/articles/john_doe',
        classification: 'Example Classification',
        place_of_service: 'Example Service Place',
        burial_place: 'Example Burial Place',
        is_approved: true,
        is_child: false,
        is_emergency_squad: true,
        at_nova: false,
    });
};
export { searchSoldierInDatabase }