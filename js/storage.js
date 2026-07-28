/*
=========================================
KÊNIA IA
LOCAL STORAGE
=========================================
*/

const Storage = {

    save(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key) {

        const data = localStorage.getItem(key);

        if (!data) return null;

        try {

            return JSON.parse(data);

        }

        catch {

            return null;

        }

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    }

};