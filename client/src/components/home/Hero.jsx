import "../../styles/Hero.css";
import heroImage from "../../assets/hero.png";

function Hero() {

    return (

       <section className="hero">

    <div className="hero-content">

        <h1>
            Your Healing Journey
            <br />
            Starts Here.
        </h1>

        <p>
            Heal Hub is a safe and supportive community where you can
            share your experiences, document your healing journey,
            connect with people who understand, and grow stronger
            together.
        </p>

        <div className="hero-buttons">

            <button className="hero-btn">
                Get Started
            </button>

            <button className="hero-btn-outline">
                Explore Community
            </button>

        </div>

    </div>

    <div className="hero-image">

        <img
            src={heroImage}
            alt="Healing Community"
        />

    </div>

</section>

    );

}

export default Hero;