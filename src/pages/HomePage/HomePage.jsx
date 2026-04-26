import Marquee from "@/shared/ui/Marquee/Marquee";
import HeroSection from "@/widgets/HeroSection/ui/HeroSection";
import PostList from "@/widgets/PostsList/PostsList";
import StatsSection from "@/widgets/StatsSection/ui/StatsSection";

function HomePage() {
    return (
        <>
            <HeroSection />
            <Marquee text='Stories from around the world ● Updated weekly ●' />
            <PostList />
            <StatsSection />
        </>
    );
}

export default HomePage;