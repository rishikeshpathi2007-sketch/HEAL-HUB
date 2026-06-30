import "../../styles/Features.css";
import FeatureCard from "./FeatureCard";

function Features() {

    return (

        <section className="features">

            <h2>Why Choose Heal Hub?</h2>

            <div className="features-grid">

                <FeatureCard
                    icon="📝"
                    title="Journal Your Journey"
                    description="Write about your healing journey and track your progress every day."
                />

                <FeatureCard
                    icon="🤝"
                    title="Supportive Community"
                    description="Connect with people who understand your experiences."
                />

                <FeatureCard
                    icon="🔒"
                    title="Privacy First"
                    description="Secure authentication and privacy-focused data protection."
                />

            </div>

        </section>

    );

}

export default Features;