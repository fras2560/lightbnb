INSERT INTO USERS (id, name, email, password) VALUES 
    (1, 'Dallas', 'dallas.fraser.waterloo@gmail.com', '1234'),
    (2, 'Dallas', 'dallas.fraser.waterloo+testing2@gmail.com', '1234'),
    (3, 'Dallas', 'dallas.fraser.waterloo+testin3@gmail.com', '1234');

INSERT INTO properties
    (
        owner_id,
        title,
        description,
        thumbnail_photo_url,
        cover_photo_url,
        cost_per_night,
        parking_spaces,
        number_of_bathrooms,
        number_of_bedrooms,
        country,
        city,
        street,
        province,
        postal_code,
        active
    )
VALUES
    (
        1,
        'Fraser Mansion',
        'Nestled within an oasis of opulence, Fraser Mansion stands as the epitome of luxury and indulgence. The mansion boasts a stunning array of amenities, including exquisite pools that beckon with crystal-clear waters glistening under the radiant sun. Immerse yourself in the lap of extravagance as you float serenely in the spacious, artfully designed pools that seamlessly blend with the lush surroundings. As you explore the lavish interiors of Fraser Mansion, you''ll discover a haven of comfort and sophistication. With a total of 16 sumptuous beds adorned with plush linens and tasteful decor, each bedroom is a sanctuary of relaxation and style. The accommodation seamlessly combines modern elegance with timeless charm, offering guests an unparalleled retreat into the lap of luxury. Indulge in the unparalleled grandeur of Fraser Mansion, where the allure of beautiful pools and the allure of 16 decadent beds converge to create an unforgettable experience of unparalleled extravagance.',
        'https://media.istockphoto.com/id/1412643214/photo/sunset-view-luxury-tropical-pool-villa.jpg?s=1024x1024&w=is&k=20&c=I7wBkCFBZnWKErSaJXLRumwsmCq4XIBavUZUMiWgun4=',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        69000,
        10,
        16,
        16,
        'Scotland',
        'Victoria Street',
        'Edinburgh',
        'Edinburgh',
        'EH1 1BE',
        '1'
    ),
    (
        2,
        'Canada Shack',
        'Nestled in the heart of a quaint Canadian wilderness, Canada Shack exudes rustic charm with a touch of adventure. However, it''s essential to note that this cozy abode has its share of challenges. Despite its picturesque surroundings, guests should be aware that Canada Shack has encountered issues, including the presence of bedbugs and a malfunctioning freezer. The interior, though humble, reflects a certain rustic elegance, providing a genuine Canadian experience. The creaking floorboards and vintage furnishings add character to this unique retreat. Unfortunately, the charm is accompanied by the inconvenience of bedbugs, which the management is actively addressing to ensure a more comfortable stay for future guests. In addition to the insect situation, the well-intentioned freezer in Canada Shack has seen better days, making it advisable for guests to plan their culinary endeavors accordingly. Despite these challenges, the Shack offers a genuine taste of Canadian wilderness living for those seeking an authentic and unfiltered experience, warts and all.',
        'https://upload.wikimedia.org/wikipedia/commons/6/6c/Shack_in_Pigeon_Forge%2C_TN_by_Zachary_Davies.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS0F42NxJUhjPqFp0ea5MsjOf_XecI8KtyrdosSk74NCH3O0RTnntGSCqxIqBjIfkH584&usqp=CAU',
        69,
        1,
        1,
        1,
        'Canada',
        '101 Waterloo Street',
        'Ontario',
        'Port Elgin',
        'N0H1C2',
        '1'
    ),
    (
        3,
        'Detroit Shack',
        'Nestled in the heart of a quaint Canadian wilderness, Canada Shack exudes rustic charm with a touch of adventure. However, it''s essential to note that this cozy abode has its share of challenges. Despite its picturesque surroundings, guests should be aware that Canada Shack has encountered issues, including the presence of bedbugs and a malfunctioning freezer. The interior, though humble, reflects a certain rustic elegance, providing a genuine Canadian experience. The creaking floorboards and vintage furnishings add character to this unique retreat. Unfortunately, the charm is accompanied by the inconvenience of bedbugs, which the management is actively addressing to ensure a more comfortable stay for future guests. In addition to the insect situation, the well-intentioned freezer in Canada Shack has seen better days, making it advisable for guests to plan their culinary endeavors accordingly. Despite these challenges, the Shack offers a genuine taste of Canadian wilderness living for those seeking an authentic and unfiltered experience, warts and all.',
        'https://upload.wikimedia.org/wikipedia/commons/6/6c/Shack_in_Pigeon_Forge%2C_TN_by_Zachary_Davies.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS0F42NxJUhjPqFp0ea5MsjOf_XecI8KtyrdosSk74NCH3O0RTnntGSCqxIqBjIfkH584&usqp=CAU',
        69,
        1,
        1,
        1,
        'USA',
        '101 Waterloo Street',
        'Michigan',
        'Detroit',
        'N0H1C2',
        '1'
    );
    
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
    (CURRENT_DATE - 2, CURRENT_DATE + 2, 1, 3),
    (CURRENT_DATE - 5, CURRENT_DATE + 10, 2, 1),
    (CURRENT_DATE - 5, CURRENT_DATE + 10, 3, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
    (3, 1, 1, 5, 'Loved it'),
    (1, 2, 2, 5, 'It is so rustic'),
    (2, 3, 3, 5, 'Instagram worthy');