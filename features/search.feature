Feature: Search a course

    Scenario: Buy a movie ticket today for a standard seat
        Given open the home page of the cinema's website
        When Go to the cinema in "2" days
        When Select film "199"
        When Choose any "standart" location
        When Click the 'Забронировать' button
        When Click on the 'Получить код бронирования' button
        Then Receive qr code and instructions "Покажите QR-код нашему контроллеру для подтверждения бронирования."


    Scenario: Buy a movie ticket today for a vip seat
        Given open the home page of the cinema's website
        When Go to the cinema in "2" days
        When Select film "199"
        When Choose any "standart" location
        When Click the 'Забронировать' button
        When Click on the 'Получить код бронирования' button
        Then Receive qr code and instructions "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    Scenario: Buy multiple tickets to a movie
        Given open the home page of the cinema's website
        When Go to the cinema in "2" days
        When Select film "199"
        When Choose "3" seats in the hall
        When Click the 'Забронировать' button
        When Click on the 'Получить код бронирования' button
        Then Receive qr code and instructions "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    @only
    Scenario: Cannot select a seat that is already taken
        Given open the home page of the cinema's website
        When Go to the cinema in "2" days
        When Select film "199"
        When Select an already taken seat
        When Click the 'Забронировать' button
        Then The 'Забронировать' button is disabled

    Scenario: The 'Забронировать' button is inactive until a seat is selected
        Given open the home page of the cinema's website
        When Go to the cinema in "2" days
        When Select film "199"
        When Click the 'Забронировать' button
        Then The 'Забронировать' button is disabled

