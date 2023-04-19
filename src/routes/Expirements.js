import Carousel from "../components/carousel"

const items = [
    <div className=" rounded-box overflow-hidden shadow-md m-3 bg-base-300">
        <img className="w-full" src="https://picsum.photos/600/300" alt="Sunset in the mountains" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-base-content text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </div>
        <div className="px-6 pt-4 pb-4">
            <div className="badge badge-accent font-semibold mr-2">#photography</div>
            <div className="badge badge-accent font-semibold mr-2">#travel</div>
            <div className="badge badge-accent font-semibold mr-2">#winter</div>
        </div>
    </div>,
    <div className=" rounded-box overflow-hidden shadow-md m-3 bg-base-300">
        <img className="w-full" src="https://picsum.photos/600/300" alt="Sunset in the mountains" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-base-content text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </div>
        <div className="px-6 pt-4 pb-4">
            <div className="badge badge-accent font-semibold mr-2">#photography</div>
            <div className="badge badge-accent font-semibold mr-2">#travel</div>
            <div className="badge badge-accent font-semibold mr-2">#winter</div>
        </div>
    </div>,
    <div className=" rounded-box overflow-hidden shadow-md m-3 bg-base-300">
        <img className="w-full" src="https://picsum.photos/600/300" alt="Sunset in the mountains" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-base-content text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </div>
        <div className="px-6 pt-4 pb-4">
            <div className="badge badge-accent font-semibold mr-2">#photography</div>
            <div className="badge badge-accent font-semibold mr-2">#travel</div>
            <div className="badge badge-accent font-semibold mr-2">#winter</div>
        </div>
    </div>,
    <div className=" rounded-box overflow-hidden shadow-md m-3 bg-base-300">
        <img className="w-full" src="https://picsum.photos/600/300" alt="Sunset in the mountains" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-base-content text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </div>
        <div className="px-6 pt-4 pb-4">
            <div className="badge badge-accent font-semibold mr-2">#photography</div>
            <div className="badge badge-accent font-semibold mr-2">#travel</div>
            <div className="badge badge-accent font-semibold mr-2">#winter</div>
        </div>
    </div>,
    <div className=" rounded-box overflow-hidden shadow-md m-3 bg-base-300">
        <img className="w-full" src="https://picsum.photos/600/300" alt="Sunset in the mountains" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-base-content text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </div>
        <div className="px-6 pt-4 pb-4">
            <div className="badge badge-accent font-semibold mr-2">#photography</div>
            <div className="badge badge-accent font-semibold mr-2">#travel</div>
            <div className="badge badge-accent font-semibold mr-2">#winter</div>
        </div>
    </div>,
    <div className=" rounded-box overflow-hidden shadow-md m-3 bg-base-300">
        <img className="w-full" src="https://picsum.photos/600/300" alt="Sunset in the mountains" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-base-content text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </div>
        <div className="px-6 pt-4 pb-4">
            <div className="badge badge-accent font-semibold mr-2">#photography</div>
            <div className="badge badge-accent font-semibold mr-2">#travel</div>
            <div className="badge badge-accent font-semibold mr-2">#winter</div>
        </div>
    </div>
];
function Button(props) {
    return <button onClick={props.onClick} className=" bg-base-300 p-2 rounded-btn active:bg-primary transition-all">{props.children}</button>
}

export default function Expirements() {
    return (
        <div>
            <p>expirements</p>
            <div className="container mx-auto">
                <Carousel items={items} Button={Button} />
            </div>
        </div>
    )
}