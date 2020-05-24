import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header className="header flexcolcenter">
                <section>
                    <article>
                        <h1>Users Interface</h1>
                        <h3>Interface that allows to view a list of users, search a user by username, add a new user, edit an existing user, delete a user.</h3>
                    </article>
                </section>
            </header>
        );
    }
}
