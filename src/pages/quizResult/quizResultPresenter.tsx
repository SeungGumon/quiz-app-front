import React from 'react';
import ApexChart from "react-apexcharts";
import {IQuizApi} from "../../atoms";
import ResultAnswerTable from "../../components/resultAnswerTable";
import RetryButton from "../../components/retryButton";

interface IQuizResultPresenter {
    correctArr: IQuizApi[]
    wrongArr: IQuizApi[]
    name: string
    oldTime: number
    unravelAgain: () => void;
}


const QuizResultPresenter: React.FC<IQuizResultPresenter> =
    ({
         correctArr,
         wrongArr,
         name,
         oldTime,
         unravelAgain
     }) => {


        return (
            <main>
                <section
                    className={'animate-fade-in-up w-full lg:pb-0 flex justify-center items-center full-screen box-border overflow-hidden fixed'}>
                    <article className={'p-6 w-10/12 md:w-5/6 lg:w-4/6 bg-white rounded-lg  md:mb-0'}>
                        <div className={'flex items-center justify-center flex-col'}>
                            <span className={'w-full font-bold text-xl'}>{name}님의 결과! 👏🏻</span>
                            <span className={'w-full font-bold text-base my-4'}>
                                {
                                    (new Date().getTime() - oldTime) / 1000 / 60 < 1 ?
                                        `우와! 총 ${correctArr.length + wrongArr.length} 문제를 ${((new Date().getTime() - oldTime) / 1000).toFixed()}초만에 해결하였습니다! !👏🏻`
                                        :
                                        `총 ${correctArr.length + wrongArr.length} 문제를 모두 해결하는데 약 ${((new Date().getTime() - oldTime) / 1000 / 60).toFixed()}분이 걸렸습니다! 🕰`
                                }</span>
                            <ApexChart
                                width={400}
                                type={'pie'}
                                series={
                                    [correctArr.length, wrongArr.length]
                                }
                                options={{
                                    labels: ['정답', '오답'],
                                    colors: ['#6EE7B7', '#FDA4AF'],
                                    legend: {
                                        position: "bottom",
                                        fontSize: "16px"
                                    },
                                    responsive: [
                                        {
                                            breakpoint: 600,
                                            options: {
                                                chart: {
                                                    width: "100%",
                                                    type: 'pie',
                                                },
                                            }
                                        }
                                    ]
                                }}
                            />
                            <div className={'flex flex-col w-full items-center justify-center '}>
                                <div className="flex flex-wrap mx-2 my-1.5 w-10/12 sm:w-6/12">
                                    <div className=" w-1/2 lg:w-1/2 px-2 mb-4">
                                        <ResultAnswerTable
                                            containerClassName={'text-grey-dark flex items-center flex-col justify-center bg-emerald-300 border-b-4 border-r-4 border-emerald-400 rounded-lg'}
                                            correctOrWrongLength={correctArr.length}
                                            text={"정답"}
                                        />

                                    </div>
                                    <div className="w-1/2 px-2 mb-4">
                                        <ResultAnswerTable
                                            containerClassName={'text-grey-dark flex items-center flex-col justify-center bg-rose-300 border-b-4 border-r-4 border-rose-400 rounded-lg'}
                                            correctOrWrongLength={wrongArr.length}
                                            text={"오답"}
                                        />
                                    </div>
                                </div>

                                <div onClick={() => window.location.replace("https://seung-gumon.github.io/quiz-app-front/")} className="flex flex-wrap mx-2 my-1.5 w-10/12 sm:w-6/12">
                                    <RetryButton
                                        className={"text-grey-dark flex items-center flex-col py-2 justify-center bg-violet-300 border-b-4 border-r-4 border-violet-400 rounded-lg"}
                                        text={"새로운 문제 풀기"}
                                    />
                                </div>
                                <div onClick={unravelAgain} className="flex flex-wrap mx-2 my-1.5 w-10/12 sm:w-6/12">
                                    <div className={`px-2 m b-4 w-full cursor-pointer`}>
                                        <RetryButton
                                            className={"text-grey-dark flex items-center flex-col py-2 justify-center bg-amber-300 border-b-4 border-r-4 border-amber-400 rounded-lg"}
                                            text={"다시풀기"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        )
    }

export default QuizResultPresenter